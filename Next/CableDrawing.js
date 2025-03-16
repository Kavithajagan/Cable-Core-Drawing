"use client"; // Required in Next.js 13+ for client-side rendering

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const CableDrawing = () => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 400, height = 400;
    const outerRadius = 150, innerRadius = 130, coreRadius = 20;
    const dashedFrameRadius = 125;
    const dashedCircleRadius = 40;
    const smallCoreOffset = coreRadius / 2.5;

    const coreData = [
      [{ x: 0, y: -100, color: "blue" }, { x: 0, y: -60, color: "blue" }],
      [{ x: 0, y: -20, color: "yellow" }, { x: 0, y: 20, color: "yellow" }],
      [{ x: -70, y: -60, color: "white" }, { x: -70, y: -20, color: "white" }],
      [{ x: 70, y: -60, color: "green" }, { x: 70, y: -20, color: "green" }],
      [{ x: -50, y: 40, color: "red" }, { x: -50, y: 80, color: "red" }],
      [{ x: 50, y: 40, color: "black" }, { x: 50, y: 80, color: "black" }]
    ];

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Outer black frame
    svg.append("circle").attr("r", outerRadius).attr("fill", "black");

    // Inner white background
    svg.append("circle").attr("r", innerRadius).attr("fill", "white");

    // Dashed blue frame
    svg.append("circle")
      .attr("r", dashedFrameRadius)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");

    coreData.forEach(pair => {
      const centerX = (pair[0].x + pair[1].x) / 2;
      const centerY = (pair[0].y + pair[1].y) / 2;

      svg.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", dashedCircleRadius)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 1.5)
        .attr("stroke-dasharray", "4,4");

      pair.forEach(d => {
        // Core circle with black border
        svg.append("circle")
          .attr("cx", d.x)
          .attr("cy", d.y)
          .attr("r", coreRadius)
          .attr("fill", d.color)
          .attr("stroke", "black")
          .attr("stroke-width", 3);

        // Plus shape copper conductor
        const offsets = [
          { dx: -smallCoreOffset, dy: 0 },
          { dx: smallCoreOffset, dy: 0 },
          { dx: 0, dy: -smallCoreOffset },
          { dx: 0, dy: smallCoreOffset }
        ];

        offsets.forEach(offset => {
          svg.append("circle")
            .attr("cx", d.x + offset.dx)
            .attr("cy", d.y + offset.dy)
            .attr("r", coreRadius / 5)
            .attr("fill", "brown");
        });
      });
    });
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default CableDrawing;
