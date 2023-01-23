import { getDocument } from '~app/lib/firebase/api'
import { COLLECTIONS } from '~app/utils/constants'

const handler = async (req, res) => {
  const { query: { id } } = req

  if (!id) {
    return res.status(500).json({ error: 'id is required', status: false })
  }
  try {
    const vehicule = await getDocument(COLLECTIONS.VEHICULES, id)

    return res.status(200).json({ vehicule, status: true })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e.message, status: false })
  }
}

export default handler
