import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";
import { format } from "date-fns";
import axios from "axios";


const SinistresChart = () => {

    const [sinistres, setSinistres] = useState([]);

    const fetchSinistres = async () => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
            return null;
        }
        try {
            const response = await axios.get(
                "http://localhost:8060/api/Gestionnaire/sinistres", {
                headers: {
                    Authorization: token,
                },
            });

            setSinistres(response.data)
        } catch (error) {
            console.error("Error fetching CLIENTS:", error);
        }
    };
    useEffect(() => {
        fetchSinistres();
    }, []);


    const sinistresByMonth = sinistres.reduce((acc, sinistre) => {
        const month = format(new Date(sinistre.date), "MMM");
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const chartData = months.map((month) => ({ x: month, y: sinistresByMonth[month] || 0 }));

    const options = {

        /*  xaxis: {
             type: "category",
             categories: months,
             labels: {
                 style: {
                     cssClass: "grey--text lighten-2--text fill-color",
                 },
             },
         },
 
     }; */
        xaxis: {
            type: "category",
            categories: months,
            labels: {
                style: {
                    cssClass: "chart-label",
                },
            },
        },

        grid: {
            show: true,
            borderColor: "transparent",
            strokeDashArray: 2,
            padding: {
                left: 0,
                right: 0,
                bottom: 0,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "42%",
                endingShape: "rounded",
                borderRadius: 5,
            },
        },

        colors: ["#1e4db7", "#a7e3f4"],
        fill: {
            type: "solid",
            opacity: 1,
        },
        chart: {
            offsetX: -15,
            toolbar: {
                show: true,
            },
            foreColor: "#adb0bb",
            fontFamily: "'DM Sans',sans-serif",
            sparkline: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 0,
        },
        legend: {
            show: false,
        },
        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        tooltip: {
            theme: "dark",
        },
    };


    const series = [
        {
            name: "Sinistres",
            data: chartData,
        },
    ];

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h3">Sinistres par mois</Typography>
                <Box sx={{ marginTop: "25px" }}>
                    <Chart options={options} series={series} type="bar" height="295px" />
                </Box>
            </CardContent>
        </Card>
    );
};

export default SinistresChart;
