import type { NextApiRequest, NextApiResponse } from 'next';
const fetch = require("node-fetch");

import { Data } from '../../utils/types';

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { city } = req.query;
  const cityName = city || "københavn";
  const param = Array.isArray(cityName) ? cityName[0] : cityName;
  const response = await fetch(`https://vejr.eu/api.php?location=${param}&degree=C`)
    .catch((error: Error) => console.log(error));
  const data = await response.json();

  // API returns random city, if city does not exist. 
  if(!data.LocationName.toLowerCase().includes(param.toLowerCase())) {
    console.log(data.LocationName.toLowerCase())
    console.log(param)
    res.status(400).json( {
      name: "",
      weatherData: undefined,
      error: "City does not exist"
    })
  } else {
    res.status(200).json( { 
      name: data.LocationName,
      weatherData: {
        temperature: data.CurrentData.temperature,
        skyText: data.CurrentData.skyText,
        humidity: data.CurrentData.humidity,
        windText: data.CurrentData.windText
      },
      error: ""
    } );
  }
}
