var MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

export default async function handler(req, res) {

    if (req.method !== 'GET') {
        res.status(405).send({ status: false, error: 'Only GET requests allowed' })
        return
    }

    try {

        MongoClient.connect(process.env.MONGO_URL, function (err, db) {
            if (err) {
                return res.status(405).json({ status: false, error: JSON.stringify(err) });
            }
            var dbo = db.db("AMORTIZE");
        
            dbo.collection("nft_datas").find(null).toArray(function (Err, result) {
                if (Err) {
                    return res.status(405).json({ status: false, error: JSON.stringify(Err) });
                }

                console.log(result);

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