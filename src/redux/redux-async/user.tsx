import { type Dispatch } from 'redux'
import { UserActions } from '../actions/user'
import { UserActionCreators } from '../actionsCreators/user'
import { FirebaseApi } from '../../api/firebase'
import { IUser } from '../../api/types/responses'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { auth } from '../../api/firebase/base'

export const fetchUser = ({ email, password }: { email: string; password: string }) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch(UserActionCreators.load())
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = await FirebaseApi.getUser(userCredential.user.uid)
      if (!user) throw { message: 'Such user not found' }
      dispatch(UserActionCreators.add(user))
    } catch (err) {
      if (err instanceof Error) dispatch(UserActionCreators.error(err.message))
    }
  }
}

export const updateUser = (id: string, data: Partial<IUser>, img?: Blob | null) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch(UserActionCreators.load())
      let body = data
      if (img) {
        const currentUser = await FirebaseApi.getUser(id)
        if (currentUser?.img) {
          await FirebaseApi.trackDeletedImage(currentUser.img, id)
        }
        const uploadedUrl = await FirebaseApi.uploadProfileImg(id, img)
        body = { ...data, img: uploadedUrl }
      }
      await FirebaseApi.refreshUser(id, body)
      const user = await FirebaseApi.getUser(id)
      if (!user) throw { message: 'Your account not found' }

      dispatch(UserActionCreators.add(user))
    } catch (err) {
      if (err instanceof Error) dispatch(UserActionCreators.error(err.message))
    }
  }
}

export const createUser = (userData: Pick<IUser, 'name'> & { email: string; password: string }) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch(UserActionCreators.load())
      createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .then(userCredential => {
          const user = userCredential.user

          FirebaseApi.createUser({
            name: userData.name,
            surname: null,
            id: user.uid,
          })
            .then(user => {
              user && dispatch(UserActionCreators.add(user))
            })
            .catch(error => {
              throw error
            })
        })
        .catch(error => {
          throw error
        })
    } catch (err) {
      if (err instanceof Error) dispatch(UserActionCreators.error(err.message))
    }
  }
}

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      const result = await signInWithPopup(auth, googleProvider)

      dispatch(UserActionCreators.load())
      const { uid, displayName } = result.user

      const existingUser = await FirebaseApi.getUser(uid)
      if (existingUser) {
        dispatch(UserActionCreators.add(existingUser))
        return
      }

      const newUser = await FirebaseApi.createUser({
        name: displayName || 'User',
        surname: null,
        id: uid,
      })
      if (newUser) dispatch(UserActionCreators.add(newUser))
    } catch (err) {
      console.error('[Google Sign-In Error]', err)
      if (err instanceof Error) dispatch(UserActionCreators.error(err.message))
    }
  }
}

export const removeFetchedUser = () => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch(UserActionCreators.load())
      await signOut(auth)
      dispatch(UserActionCreators.remove())
    } catch (err) {
      if (err instanceof Error) dispatch(UserActionCreators.error(err.message))
    }
  }
}

export const getLoggedUser = () => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch(UserActionCreators.load())
      await onAuthStateChanged(auth, userCredential => {
        if (!userCredential) return
        ;(async () => {
          const user = await FirebaseApi.getUser(userCredential.uid)
          user && dispatch(UserActionCreators.add(user))
        })()
      })
    } catch (err) {
      if (err instanceof Error) dispatch(UserActionCreators.error(err.message))
    }
  }
}
