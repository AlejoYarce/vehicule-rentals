import { getVehicules } from '~app/lib/firebase/api'

const handler = async (req, res) => {
  try {
    const vehicules = await getVehicules()

    return res.status(200).json({ vehicules, status: true })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e.message, status: false })
  }
}

export default handler
