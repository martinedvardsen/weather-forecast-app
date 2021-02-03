export interface WeatherData {
  temperature: number;
  skyText: string;
  humidity: number;
  windText: string;
}

export interface Data {
  name: string;
  weatherData: WeatherData | undefined;
  error: string;
}