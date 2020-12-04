import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import * as d3 from "d3";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormattedMessage } from "react-intl";

const Series = () => {
  const [series, setSeries] = useState([]);
  const URLes =
    "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/d9eb0701f6b495dac63bbf59adc4614a9eb5fbc8/series-es.json";
  const URLen =
    "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/64146e99e4416da3a8be2e2da4156cb87b3f6fd0/series-en.json";

  function getBrowserLang() {
    return navigator.language || navigator.userLanguage;
  }

  function drawChart(data) {
    const canvas = d3.select("#canvas");

    const width = 700;
    const height = 500;
    const margin = { top: 10, left: 50, bottom: 40, right: 10 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;

      canvas.append('h1').text("Seasons") 

    const svg = canvas.append("svg");

    svg.attr("width", width);
    svg.attr("height", height);

    let g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    let arreglo=[];
    data.map((d)=>arreglo.push(d.seasons));  
    let max = Math.max(...arreglo);
    const y = d3.scaleLinear().domain([0, max]).range([iheight, 0]);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, iwidth])
      .padding(0.1);

    const bars = g.selectAll("rect").data(data);

    bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", "orange")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.seasons))
      .attr("height", (d) => iheight - y(d.seasons))
      .attr("width", x.bandwidth());

    g.append("g")
      .classed("x--axis", true)
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0, ${iheight})`);

    g.append("g").classed("y--axis", true).call(d3.axisLeft(y));
  }

  useEffect(() => {
    let url = "";
    if (getBrowserLang() === "en") {
      url = URLen;
    } else {
      url = URLes;
    }
    if (!navigator.onLine) {
      if (localStorage.getItem("series") === null) {
        setSeries("Error while connecting with API. Try again later.");
      } else {
        setSeries(JSON.parse(localStorage.getItem("series")));
        console.log(series);
      }
    } else {
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setSeries(res);
          drawChart(res);
          localStorage.setItem("series", JSON.stringify(res));
        });
    }
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <h1>Series</h1>
        <hr></hr>
        <div>
          <Table striped bordered hover>
            <thead className="thead-dark">
              <tr>
                <th scope="col">
                  <FormattedMessage id="Id"></FormattedMessage>
                </th>
                <th scope="col">
                  <FormattedMessage id="Name"></FormattedMessage>
                </th>
                <th scope="col">
                  <FormattedMessage id="Channel"></FormattedMessage>
                </th>
                <th scope="col">
                  <FormattedMessage id="Description"></FormattedMessage>
                </th>
              </tr>
            </thead>
            <tbody>
              {series.map((e, i) => (
                <tr key={i}>
                  <th scope="row">{e.id}</th>
                  <td>{e.name}</td>
                  <td>{e.channel}</td>
                  <td>{e.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>
            <div id="canvas"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Series;
