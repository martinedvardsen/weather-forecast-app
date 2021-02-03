import type { NextApiRequest, NextApiResponse } from 'next';

import { Data } from '../../utils/types';

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { city } = req.query;
  const param = city || "Aarhus";
  const response = await fetch(`${process.env.API_DOMAIN}?location=${param}&degree=C`);
  const data = await response.json();

  res.status(200).json( { 
    name: data.LocationName,
    weatherData: {
      temperature: data.CurrentData.temperature,
      skyText: data.CurrentData.skyText,
      humidity: data.CurrentData.humidity,
      windText: data.CurrentData.windText
    }
  } );
}
