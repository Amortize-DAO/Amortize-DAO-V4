const { NFT_MODEL } = require("../../../mongoDb/Server/index")


export default async function handler(req, res) {

    if (req.method !== 'POST') {
        res.status(405).send({ status: false, message: 'Only POST requests allowed' })
        return
    }

    try {

        const { Home, StxAddress } = req.body;

        const { Address, Phone,Zipcode,City,Estate, URL } = Home[0];

        const New_NFT = new NFT_MODEL({
            StxAddress: StxAddress,
            URL: URL,
            time: new Date(),
            State: Estate,
            ZipCode: Zipcode,
            City: City,
            Phone: Phone,
            Address: Address,
        });

        New_NFT.save(function (err) {
            if (err) {
                throw err;
            }
        });

        res.status(200).send({ status: true, message: 'NFT Saved' })
        
        return

    }
    catch (err) {
        res.status(405).send({ status: false, message: err })
        return
    }
}

export const config = {
    api: {
        externalResolver: true,
    },
}