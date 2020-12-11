import { sstyled, Txt } from "components";
// import { moderateScale } from "react-native-size-matters";
import { useAppContext, useSheets } from "engines";
import * as React from "react";
import * as Animatable from "react-native-animatable";
import { ScrollView } from "react-native";
import { IPSCR, spacing, use18 } from "utils";

export default (props: IPSCR) => {
  const { C } = useAppContext();

  const { data } = useSheets(0, "About");

  return (
    <Sctnr {...props}>
      <Animatable.View animation="fadeInUp" delay={100}>
        <TxtBody {...props} category={"s2"} adjustsFontSizeToFit>
          {use18("bio-long")}
        </TxtBody>
      </Animatable.View>
    </Sctnr>
  );
};

const Sctnr = sstyled(ScrollView)((p) => ({
  flex: 1,
  // paddingHorizontal: spacing(6),
  paddingTop: spacing(5),
  backgroundColor: p.C.background,
}));

const TxtBody = sstyled(Txt.P1)((p) => ({
  color: p.C.text,
  paddingHorizontal: spacing(6),
  textAlign: "center",
}));
