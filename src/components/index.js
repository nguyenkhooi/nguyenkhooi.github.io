//@ts-check

export * from "./m/decks";
export * from "./a/generals";
export * from "./a/others";
export * from "./a/externals";
//@ts-check
// export * from "./atoms";
// export * from "./molecules";
// export * from "./organisms";
// export * from "./templates";
import * as molecules from "./m";
import * as organisms from "./o";
import * as templates from "./t";
/**
 * ### `Organisms` are assemblies of `molecules` functioning together as a unit
 *  - Can range from single-celled organisms to complex af organisms (think of human's biological structures)
 *  - Only `organisms` can set positions of `atoms`, but these stacks **CAN'T have margins and positions**
 *  ----
 *  @version 21.03.15
 *  -  *Brief description*
 *  @author  K
 *
 **/
export const O = organisms;

/**
 * ### Molecules are groups of two or more atoms bonded together with functions and conditions, making them more operational
 *  - Detailed explanation (if any)
 *  ----
 *  @example
 *  soon
 *  ----
 *  @version 21.03.15
 *  -  *Brief description*
 *  @author  K
 *
 **/
export const M = molecules;

export const T = templates;
