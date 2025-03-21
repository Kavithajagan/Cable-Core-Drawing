import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const CableDrawing = () => {
    const svgRef = useRef();

    useEffect(() => {
        const width = 400, height = 400;
        const outerRadius = 150, innerRadius = 130, coreRadius = 20;
        const dashedFrameRadius = 125; // Radius for the blue dashed frame
        const dashedCircleRadius = 40; // Radius for the small dashed circles around pairs
        const smallCoreOffset = coreRadius / 2.5; // Offset for small circles inside cores

        // Define the 6 pairs of circles based on required positions
        const coreData = [
            [{ x: 0, y: -100, color: "blue" }, { x: 0, y: -60, color: "blue" }],  // Blue (Top-Center)
            [{ x: 0, y: -20, color: "yellow" }, { x: 0, y: 20, color: "yellow" }],  // Yellow (Below Blue)
            [{ x: -70, y: -60, color: "white" }, { x: -70, y: -20, color: "white" }], // White (Top-Left)
            [{ x: 70, y: -60, color: "green" }, { x: 70, y: -20, color: "green" }],  // Green (Top-Right)
            [{ x: -50, y: 40, color: "red" }, { x: -50, y: 80, color: "red" }],  // Red (Bottom-Left)
            [{ x: 50, y: 40, color: "black" }, { x: 50, y: 80, color: "black" }]   // Black (Bottom-Right)
        ];

        // Clear existing SVG content
        d3.select(svgRef.current).selectAll("*").remove();

        // Create the SVG container
        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        // Draw outer black frame (cable border)
        svg.append("circle")
            .attr("r", outerRadius)
            .attr("fill", "black");

        // Draw inner white background
        svg.append("circle")
            .attr("r", innerRadius)
            .attr("fill", "white");

        // Draw dashed blue frame inside the black frame
        svg.append("circle")
            .attr("r", dashedFrameRadius)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "5,5");

        // Draw colored core pairs (separated correctly)
        coreData.forEach(pair => {
            // Draw dashed small circle around each pair
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
                // Draw the thick colored core frame with a black border
                svg.append("circle")
                    .attr("cx", d.x)
                    .attr("cy", d.y)
                    .attr("r", coreRadius)
                    .attr("fill", d.color)  // Keep core color
                    .attr("stroke", "black") // Black border
                    .attr("stroke-width", 3);

                // Cut out four small transparent areas in a plus (+) shape inside each core
                const offsets = [
                    { dx: -smallCoreOffset, dy: 0 },  // Left
                    { dx: smallCoreOffset, dy: 0 },   // Right
                    { dx: 0, dy: -smallCoreOffset }, // Top
                    { dx: 0, dy: smallCoreOffset }   // Bottom
                ];

                offsets.forEach(offset => {
                    svg.append("circle")
                        .attr("cx", d.x + offset.dx)
                        .attr("cy", d.y + offset.dy)
                        .attr("r", coreRadius / 5)
                        .attr("fill", "brown"); // Transparent effect
                });
            });
        });

    }, []);

    return <svg ref={svgRef}></svg>;
};

export default CableDrawing;