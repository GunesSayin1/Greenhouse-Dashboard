import {withStyles} from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";

const StyledRow = withStyles({
  root: {
    background: "white",
    color: "#858585 !important",
    height: 48,
    "&:hover": {
      color: "#F0F0F0 !important",
      background: "#14584E !important"
    },
              "&$hover:hover": {
              color: "#F0F0F0 !important",
        },
  },

  body:{
          color: "#858585 !important",
      "&:hover": {
      color: "#F0F0F0 !important",
      background: "#14584E !important"
    },
              "&$hover:hover": {
              color: "#F0F0F0 !important",
        },
  }
})(TableRow);