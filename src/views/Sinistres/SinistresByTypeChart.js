/* import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";
import axios from "axios";

const SinistresByTypeChart = () => {
  const [sinistres, setSinistres] = useState([]);

  const fetchSinistres = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    try {
      const response = await axios.get(
        "http://localhost:8060/api/Gestionnaire/sinistres",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setSinistres(response.data);
    } catch (error) {
      console.error("Error fetching SINISTRES:", error);
    }
  };

  useEffect(() => {
    fetchSinistres();
  }, []);

  // Filter sinistres with non-empty typePers and count the number of sinistres in each group
  const sinistresByType = sinistres.reduce((acc, sinistre) => {
    const typePers = sinistre.user && sinistre.user.typePers ? sinistre.user.typePers : "Unknown";

    // Skip sinistres with empty typePers
    if (typePers.trim() === "") {
      return acc;
    }

    acc[typePers] = (acc[typePers] || 0) + 1;
    return acc;
  }, {});

  // Extract the typePers values as categories for the chart
  const categories = Object.keys(sinistresByType);

  // Chart options for grouped bar chart
  const options = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#1e4db7", "#ff8042"],
    xaxis: {
      categories,
      title: {
        text: "Type de personne",
      },
    },
    yaxis: {
      title: {
        text: "Nombre de sinistres",
      },
    },
    legend: {
      position: "top",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  // Chart data for grouped bar chart
  const series = [
    {
      name: "Nombre de sinistres",
      data: categories.map((category) => sinistresByType[category] || 0),
    },
  ];

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h3">Sinistres par type de personne</Typography>
        <Box sx={{ marginTop: "25px" }}>
          <Chart options={options} series={series} type="bar" width="100%" height="350" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SinistresByTypeChart;
 */

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";
import axios from "axios";

const SinistresByTypeChart = () => {
  const [sinistres, setSinistres] = useState([]);

  const fetchSinistres = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    try {
      const response = await axios.get(
        "http://localhost:8060/api/Gestionnaire/sinistres",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setSinistres(response.data);
    } catch (error) {
      console.error("Error fetching SINISTRES:", error);
    }
  };

  useEffect(() => {
    fetchSinistres();
  }, []);

  // Filter sinistres with non-empty typePers and count the number of sinistres in each group
  const sinistresByType = sinistres.reduce((acc, sinistre) => {
    const typePers = sinistre.user && sinistre.user.typePers ? sinistre.user.typePers : "Unknown";

    // Skip sinistres with empty typePers
    if (typePers.trim() === "") {
      return acc;
    }

    acc[typePers] = (acc[typePers] || 0) + 1;
    return acc;
  }, {});

  // Chart options for pie chart
  const options = {
    chart: {
      type: "pie",
    },
    labels: Object.keys(sinistresByType),
    colors: ["#204393", "#ed3026"],
    legend: {
      show: true,
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return opts.w.config.series[opts.seriesIndex];
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  // Chart data for pie chart
  const series = Object.values(sinistresByType);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h3">Sinistres par type de personne</Typography>
        <Box sx={{ marginTop: "25px" }}>
          <Chart options={options} series={series} type="pie" width="100%" height="350" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SinistresByTypeChart;
