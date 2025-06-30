import { db } from '~/server/utils/firebase-admin'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = query.id as string | undefined

  if (id) {
    const doc = await db.collection('rt-servers').doc(id).get()

    if (!doc.exists) {
      throw createError({
        statusCode: 404,
        statusMessage: `Document with ID '${id}' not found`,
      })
    }

    return {
      ...doc.data(),
    }
  }

  // FIND ALL
  const snapshot = await db.collection('rt-servers').get()
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
  }))
})
