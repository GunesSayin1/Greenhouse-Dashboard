import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { withStyles } from "@material-ui/core/styles";

import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

import styles from "./Table.module.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      body: {
        //This can be referred from Material UI API documentation.
        color: "#14584e !important",
        border: "solid 1px #F0F0F0",

        height: 48,
        "&:hover": {},
        "&$hover:hover": {},
      },
    },

    MuiTableRow: {
      body: {
        //This can be referred from Material UI API documentation.
        background: "white",
        border: "solid 1px #F0F0F0",
        color: "#858585 !important",
        "&:hover": {
          color: "#F0F0F0 !important",
          border: "solid 1px #F0F0F0",
          borderRadius: "445px",
          padding: "20px",
          background: "#14584E !important",
        },
        "&$hover:hover": {
          border: "solid 1px #F0F0F0",
          borderRadius: "445px",
          padding: "20px",
          color: "#F0F0F0 !important",
        },
      },
    },
  },
});

const StyledRow = withStyles({
  root: {
    background: "white",
    color: "#14584e !important",
    height: 48,
    "&:hover": {
      color: "#F0F0F0 !important",
      background: "#f5eadf !important",
      borderRadius: "445px",
      padding: "20px",
    },
    "&$hover:hover": {
      color: "#F0F0F0 !important",
      borderRadius: "445px",
      padding: "20px",
    },
  },

  body: {
    color: "#858585 !important",
    "&:hover": {
      borderRadius: "445px",
      padding: "20px",
      color: "#F0F0F0 !important",
      background: "#14584E !important",
    },
    "&$hover:hover": {
      borderRadius: "445px",
      padding: "20px",
      color: "#F0F0F0 !important",
    },
  },
})(TableRow);

const useStyles = makeStyles({
  TableCell: {
    color: "#858585 !important",
    "&:hover": {
      color: "#F0F0F0 !important",
    },
  },

  root: {
    color: "#858585 !important",
  },
  table: {
    minWidth: 650,
  },
  tableRow: {
    color: "#14584e",
    hover: {
      "&$hover:hover": {
        backgroundColor: "#49bb7b",
        borderRadius: "445px",
        padding: "20px",
      },
      "&:hover": {
        background: "yellow !important",
      },
    },
  },

  body: {
    hover: {
      "&$hover:hover": {
        backgroundColor: "#49bb7b",
        color: "#F0F0F0",
      },
      "&:hover": {
        color: "#F0F0F0",
      },
    },
  },
});


const handleCellClick = (e) => {
  console.log(e.target.textContent);
};

export default function BasicTable({ greenhouses }) {
    console.log(greenhouses.dictionary)
  // {greenhouses.map(greenhouse => {
  //   return (
  //       <div key={greenhouses.greenhouse_id}>
  //         <h3>{greenhouse.greenhouse_type}</h3>
  //       </div>
  //   )
  // })}
  const classes = useStyles();


  return (
    <TableContainer style={{ width: 1000, height: 900 }}>
      <ThemeProvider theme={theme}>
        <>
          <Paper className={classes.root}>
            <Table
              className={classes.table}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className={styles.HeaderCell}>
                    Plant Name
                  </TableCell>
                  <TableCell className={styles.HeaderCell}>
                    Recommended Greenhouse Co2
                  </TableCell>
                  <TableCell className={styles.HeaderCell}>
                    Recommended Greenhouse Temperature
                  </TableCell>
                  <TableCell className={styles.HeaderCell}>
                    Recommended Plant Temperature
                  </TableCell>
                  <TableCell className={styles.HeaderCell}>
                    Reoccurring
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody classes={{ body: classes.TableCell }}>
                {greenhouses.dictionary.map((row) => {
                  return (
                    <StyledRow
                      key={row.Greenhouse_CO2}
                      hover={"true"}
                      classes={{ body: classes.TableCell }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableRow}
                      >
                        {row.Greenhouse_CO2 ? (
                          <Link
                            to={`/products/${row.plant_name}`}
                            style={{
                              color: "inherit",
                              textDecoration: "inherit",
                            }}
                          >
                            {row.plant_name}
                          </Link>
                        ) : (
                          row.Greenhouse_CO2
                        )}
                      </TableCell>
                      <TableCell>{row.Greenhouse_CO2}</TableCell>
                      <TableCell>{row.Greenhouse_Temperature}</TableCell>
                                            <TableCell>{row.Plant_Temperature}</TableCell>
                                            <TableCell>{row.Reoccurring}</TableCell>
                    </StyledRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </>
      </ThemeProvider>
    </TableContainer>
  );
}
