import * as R from "ramda";
import * as React from "react";
import Tabletop from "tabletop";

/**
 * Hook that use Tabletop to fetch data from google Sheets
 * @version 0.10.4
 * @see https://medium.com/@ryan.mcnierney/using-react-google-sheets-as-your-cms-294c02561d59
 *
 */
export function useSheets(
  /** 0 for default Sheets file */
  key: 0 | string,
  sheetName: "Work" | "Exp" | "About" | "Ringading_Exp" = "Work"
) {
  const _key = key == 0 ? "1QkECelCYiVVxopwsZD2UsLYZdmd1vFzFc0-pLb71rX8" : key;
  const [_fields, setFields] = React.useState<dFields>([]);
  const [_data, setData] = React.useState<rSheets[] | null>([]);
  React.useEffect(function fetchData() {
    Tabletop.init({
      key: _key,
      /** set `wanted` with specific `sheetName` to get data only from that sheet */
      wanted: [sheetName],
      simpleSheet: true,
    }).then(async (googleData: null | rSheets[]) => {
      try {
        !!googleData && setData(googleData) && setFields(R.keys(googleData[0]));
      } catch (error) {
        console.warn("err useSheets: ", error);
      }
    });
  }, []);

  return { data: _data, fields: _fields };
}

type dFields = (string | number | symbol)[];
export type rSheets = {
  _id: string;
  title: string;
  thumbnail: string;
  color: string;
  label: string;
  headline: string;
  body: string;
  body00?: string;
  body01?: string;
  body02?: string;
  body03?: string;
  body04?: string;
  body05?: string;
  body06?: string;
  body07?: string;
  body08?: string;
  body09?: string;
  body10?: string;
  image00?: string;
  image01?: string;
  image02?: string;
  image03?: string;
  image04?: string;
  image05?: string;
  image06?: string;
  image07?: string;
  image08?: string;
  image09?: string;
  image10?: string;
};
