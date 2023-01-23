import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  addDoc,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'

import { COLLECTIONS } from '~app/utils/constants'
import { initFirebase } from '~app/lib/firebase/client'

export const addDocument = async (collectionName, data, id) => {
  const firestore = getFirestore()

  let documentId = id
  if (id) {
    const ref = collection(firestore, collectionName)
    await setDoc(doc(ref, id), data, { merge: true })
  } else {
    const result = await addDoc(collection(firestore, collectionName), data)
    documentId = result.id
  }

  return documentId
}

export const getDocument = async (collectionName, id) => {
  const firestore = getFirestore()

  const ref = doc(firestore, collectionName, id)
  const snapshot = await getDoc(ref)

  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : {}
}

export const getDocuments = async (collectionName) => {
  const result = []

  const firestore = getFirestore()

  const querySnapshot = await getDocs(collection(firestore, collectionName))
  querySnapshot.forEach((item) => {
    result.push({ id: item.id, ...item.data() })
  })

  return result
}

export const updateDocument = async (collectionName, data, id) => {
  const firestore = getFirestore()

  const ref = doc(firestore, collectionName, id)
  await setDoc(ref, data, { merge: true })
}

export const deleteDocument = async (collectionName, id) => {
  const firestore = getFirestore()

  await deleteDoc(doc(firestore, collectionName, id))
}

export const getAgendaByVehiculeAndMonth = async (vehiculeId, month) => {
  let result = []

  try {
    const firestore = getFirestore()

    const ref = collection(firestore, COLLECTIONS.AGENDA)
    const q = query(
      ref,
      where('vehicule.id', '==', vehiculeId),
      where('month', '==', month),
    )
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((item) => {
      result.push({ id: item.id, ...item.data() })
    })
  } catch (e) {
    console.log(e)
    result = []
  }

  return result
}

export const getVehicules = async () => {
  initFirebase()

  const firestore = getFirestore()

  const q = query(collection(firestore, COLLECTIONS.VEHICULES), orderBy('createdAt', 'desc'))
  const snapshots = await getDocs(q)

  const vehicules = []
  snapshots.forEach((snap) => vehicules.push({ id: snap.id, ...snap.data() }))

  return vehicules
}

export const getAgendaByUser = async (userId) => {
  let result = []

  try {
    const firestore = getFirestore()

    const ref = collection(firestore, COLLECTIONS.AGENDA)
    const q = query(
      ref,
      where('user.id', '==', userId),
    )
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((item) => {
      result.push({ id: item.id, ...item.data() })
    })
  } catch (e) {
    console.log(e)
    result = []
  }

  return result
}

export const getAgendaByVehicule = async (vehiculeId) => {
  let result = []

  try {
    const firestore = getFirestore()

    const ref = collection(firestore, COLLECTIONS.AGENDA)
    const q = query(
      ref,
      where('vehicule.id', '==', vehiculeId),
    )
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((item) => {
      result.push({ id: item.id, ...item.data() })
    })
  } catch (e) {
    console.log(e)
    result = []
  }

  return result
}

export const getVehiculesByParams = async (filter) => {
  let vehiculesList = []

  try {
    const firestore = getFirestore()

    const ref = collection(firestore, COLLECTIONS.VEHICULES)
    const conditions = []

    if (filter.model && filter.model.value) {
      conditions.push(where(`queryModel.${filter.model.value.toLowerCase()}`, '==', true))
    }

    if (filter.color && filter.color.value) {
      conditions.push(where('color', '==', filter.color.value))
    }

    if (filter.location && filter.location.value) {
      conditions.push(where('location', '==', filter.location.value))
    }

    const q = query(ref, ...conditions)
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((item) => {
      vehiculesList.push({ id: item.id, ...item.data() })
    })
  } catch (e) {
    console.log(e)
    vehiculesList = []
  }

  return vehiculesList
}
