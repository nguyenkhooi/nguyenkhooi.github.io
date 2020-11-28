import { sstyled, Txt } from "components";
// import { moderateScale } from "react-native-size-matters";
import { useSheets, withTheme } from "engines";
import * as React from "react";
import * as Animatable from "react-native-animatable";
import { ScrollView } from "react-native";
import { IPSCR, spacing } from "utils";

export default withTheme((props: IPSCR) => {
  const {
    theme: { C },
  } = props;

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
});

const CtnrScroll = sstyled(ScrollView)(({ theme: { C } }) => ({
  flex: 1,
  // paddingHorizontal: spacing(6),
  paddingTop: spacing(5),
  backgroundColor: C.background01,
}));

const TxtBody = sstyled(Txt.P1)(({ theme: { C } }) => ({
  color: C.text01,
  paddingHorizontal: spacing(6),
}));
