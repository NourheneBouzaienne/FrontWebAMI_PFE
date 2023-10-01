import React from "react";
import { Grid, Box } from "@mui/material";

import {
  BlogCard,
  SalesOverview,
  ProductPerformance,
  DailyActivities,
} from "./dashboard1-components";
import SinistresChart from "../Sinistres/SinistresChart";
import SinistresByTypeChart from "../Sinistres/SinistresByTypeChart";
import PowerBIEmbed from "../../components/PowerBIEmbed";

const Dashboard1 = () => {
  // 2

  return (
    <Box>
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        {/* <Grid item xs={12} lg={12}>
          <SalesOverview />
        </Grid> */}
        {/*   <Grid item xs={12} lg={12}>    <SinistresChart /> </Grid> */}

        {/*   <Grid item xs={12} lg={12}>  <SinistresByTypeChart /> </Grid>
 */}
        {/* ------------------------- row 2 ------------------------- */}
        {/*  <Grid item xs={12} lg={4}>
          <DailyActivities />
        </Grid>
        <Grid item xs={12} lg={8}>
          <ProductPerformance />
        </Grid>
        {/* ------------------------- row 3 ------------------------- */}
        {/*  <BlogCard /> */}
      </Grid>



      <PowerBIEmbed> </PowerBIEmbed>
    </Box>
  );
};

export default Dashboard1;
