import { sstyled, Txt } from "components";
// import { moderateScale } from "react-native-size-matters";
import { useAppContext, useSheets } from "engines";
import * as React from "react";
import * as Animatable from "react-native-animatable";
import { ScrollView } from "react-native";
import { IPSCR, spacing } from "utils";

export default (props: IPSCR) => {
  const { C } = useAppContext();

  const { data } = useSheets(0, "About");

  return (
    <CtnrScroll {...props}>
      <Animatable.View animation="fadeInUp" delay={1000}>
        <TxtBody {...props} category={"s2"} adjustsFontSizeToFit>
          {!!data[0] && data[0].body}
        </TxtBody>
      </Animatable.View>
    </CtnrScroll>
  );
};

const CtnrScroll = sstyled(ScrollView)((p) => ({
  flex: 1,
  // paddingHorizontal: spacing(6),
  paddingTop: spacing(5),
  backgroundColor: p.C.background01,
}));

const TxtBody = sstyled(Txt.P1)((p) => ({
  color: p.C.text01,
  paddingHorizontal: spacing(6),
}));
