import { v4 as uuid } from 'uuid';
// import { userSession } from './auth';
import { userSession } from "../pages/_app";
import { Storage } from '@stacks/storage';

const HOMEINFO_TABLE = 'HOMESINFO_TABLE.json';

export async function saveHomeInfo(homeinfo, previousHomes) {
  // const storage = new Storage({ userSession });
  const storage = new Storage({ userSession });
  var Homes = [];
  Homes.push(homeinfo);
  // const previousAgent = await fetchAgentInfo();
  previousHomes.forEach(element => {
    Homes.push(element);
  });
  return await storage.putFile(HOMEINFO_TABLE, JSON.stringify({ Homes }));
}

export const defaultHomeInfo =
{
  Address: "",
  Phone: "",
  Zipcode: "",
  City: "",
  Estate: "",
  URL: "",
  id: uuid(),
};

export async function fetchHomeInfo() {
  const storage = new Storage({ userSession });
  try {

    const homeInfoJSON = await storage.getFile(HOMEINFO_TABLE);
    if (homeInfoJSON) {
      const json = JSON.parse(homeInfoJSON);
      // console.log(json);
      return json.Homes;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function removeHomeInfo(HomeAddress, previousHomes) {
  const storage = new Storage({ userSession });
  var Homes = [];
  // agents.push(agentinfo);
  // const previousAgent = await fetchAgentInfo();
  previousHomes.forEach(element => {
      if (element.Address != HomeAddress) {
          Homes.push(element);
      }
  });
  return await storage.putFile(HOMEINFO_TABLE, JSON.stringify({ Homes }));
}

///// NFT Pic


const imageFileOptions = {
  encrypt: false,
  contentType: "image/jpg",
  dangerouslyIgnoreEtag: true,
};

export async function saveNFTPic(userPic) {
  const storage = new Storage({ userSession });
  let filename = uuid() + '.jpg'
  return await storage.putFile(filename, userPic, imageFileOptions);
}





