var MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

export default async function handler(req, res) {

    if (req.method !== 'GET') {
        res.status(405).send({ status: false, error: 'Only GET requests allowed' })
        return
    }

    const { StxAddress } = req.query;

    console.log(StxAddress);

    try {

        MongoClient.connect(process.env.MONGO_URL, function (err, db) {
            if (err) {
                return res.status(405).json({ status: false, error: JSON.stringify(err) });
            }
            var dbo = db.db("AMORTIZE");
            var query = { StxAddress: StxAddress }; // only select doctors
            dbo.collection("nft_datas").find(query).toArray(function (Err, result) {
                if (Err) {
                    return res.status(405).json({ status: false, error: JSON.stringify(Err) });
                }
                db.close();
                return res.status(200).json({ status: true, data: JSON.stringify(result) });
            });
        });

    }
    catch (err) {
        return res.status(405).json({ status: false, error: JSON.stringify(err) });
    }
}

export const config = {
    api: {
      externalResolver: true,
    },
  }