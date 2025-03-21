import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

const CableDrawing = ({ layer }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 400,
      height = 400;
    const outerRadius = 150;

    const color = `rgb(${layer.drawcolour1})`;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Define SVG Filters for soft curved edge effect
    const defs = svg.append("defs");

    const filter = defs.append("filter")
      .attr("id", "softGlow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");

    filter.append("feGaussianBlur")
      .attr("stdDeviation", 3)
      .attr("result", "blur");

    filter.append("feBlend")
      .attr("in", "SourceGraphic")
      .attr("in2", "blur")
      .attr("mode", "normal");

    // Define radial gradient for border glow
    const borderGradient = defs.append("radialGradient")
      .attr("id", "borderGradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%");

    borderGradient.append("stop").attr("offset", "80%").attr("stop-color", "#FFC773");
    borderGradient.append("stop").attr("offset", "100%").attr("stop-color", "transparent");

    // Draw main copper circle with gradient
    svg.append("circle")
      .attr("r", outerRadius)
      .attr("fill", color)
      .attr("stroke", "url(#borderGradient)")
      .attr("stroke-width", 10)
      .style("filter", "url(#FFC773)");

    // Add six-directional shine effect
    for (let i = 0; i < 6; i++) {
      const angle = (i * 60);
      const gradient = defs.append("linearGradient")
        .attr("id", `shineGradient${i}`)
        .attr("x1", "0%").attr("y1", "50%")
        .attr("x2", "100%").attr("y2", "50%");

      gradient.append("stop").attr("offset", "0%").attr("stop-color", "#FFC773");
      gradient.append("stop").attr("offset", "20%").attr("stop-color", color);
      gradient.append("stop").attr("offset", "50%").attr("stop-color", "#F9F295");
      gradient.append("stop").attr("offset", "80%").attr("stop-color", color);
      gradient.append("stop").attr("offset", "100%").attr("stop-color", "#FFC773");

      svg.append("rect")
        .attr("x", -outerRadius)
        .attr("y", -outerRadius / 6)
        .attr("width", outerRadius * 2)
        .attr("height", outerRadius / 3)
        .attr("fill", `url(#shineGradient${i})`)
        .attr("transform", `rotate(${angle})`);
    }

    // Add brushed metal concentric circles
    const numLines = 80;
    for (let i = 0; i < numLines; i++) {
      svg.append("circle")
        .attr("r", (outerRadius / numLines) * i)
        .attr("stroke", "rgba(0, 0, 0, 0.5)")
        .attr("stroke-width", 0.4)
        .attr("fill", "none");
    }

  }, [layer]);

  return <svg ref={svgRef}></svg>;
};

CableDrawing.propTypes = {
  layer: PropTypes.shape({
    layercode: PropTypes.string.isRequired,
    processName: PropTypes.string.isRequired,
    drawtype: PropTypes.string.isRequired,
    subtype: PropTypes.string,
    outerdiameter: PropTypes.number.isRequired,
    drawcolour1: PropTypes.string.isRequired,
    drawlabel: PropTypes.string.isRequired
  }).isRequired
};

const Home = () => {
  const jsonData = {
    layers: [
      {
        layercode: "10",
        processName: "WireDrawing",
        drawtype: "Drawing",
        subtype: "",
        outerdiameter: 2.52,
        drawcolour1: "184, 115, 51",
        drawlabel: "Copper wire of 2.5 mm"
      }
    ]
  };

  return (
    <div>
      <h2>Wire Drawing Visualization</h2>
      <CableDrawing layer={jsonData.layers[0]} />
    </div>
  );
};

export default Home;