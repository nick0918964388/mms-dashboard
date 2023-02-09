import React, { useEffect, useState } from "react";
import "react-pivottable/pivottable.css";
import PivotTableUI from "react-pivottable/PivotTableUI";
import TableRenderers from "react-pivottable/TableRenderers";
import { PivotData } from "react-pivottable/Utilities";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import createPlotlyComponent from "react-plotly.js/factory";
import CustomPlot from "react-plotly.js";

function makeRenderer(
  PlotlyComponent,
  traceOptions = {},
  layoutOptions = {},
  transpose = false
) {
  class Renderer extends React.PureComponent {
    render() {
      console.log("propsssss", this.props);
      const pivotData = new PivotData(this.props);
      const rowKeys = pivotData.getRowKeys();
      const colKeys = pivotData.getColKeys();
      const traceKeys = transpose ? colKeys : rowKeys;
      if (traceKeys.length === 0) {
        traceKeys.push([]);
      }
      const datumKeys = transpose ? rowKeys : colKeys;
      if (datumKeys.length === 0) {
        datumKeys.push([]);
      }

      let fullAggName = this.props.aggregatorName;
      const numInputs =
        this.props.aggregators[fullAggName]([])().numInputs || 0;
      if (numInputs !== 0) {
        fullAggName += ` of ${this.props.vals.slice(0, numInputs).join(", ")}`;
      }

      const data = traceKeys.map((traceKey) => {
        const r = [];
        const theta = [];
        for (const datumKey of datumKeys) {
          const val = parseFloat(
            pivotData
              .getAggregator(
                transpose ? datumKey : traceKey,
                transpose ? traceKey : datumKey
              )
              .value()
          );
          r.push(isFinite(val) ? val : null);
          theta.push(datumKey.join("-") || " ");
        }
        const trace = { name: traceKey.join("-") || fullAggName };

        trace.fill = "toself";
        trace.r = r;
        trace.theta = theta.length > 1 ? theta : [fullAggName];

        return Object.assign(trace, traceOptions);
      });

      console.log("dataaa", data);
      const layout = {
        polar: {
          radialaxis: {
            visible: true,
            range: [0, 50]
          }
        }
        /* eslint-disable no-magic-numbers */
        // width: window.innerWidth / 1.5,
        // height: window.innerHeight / 1.4 - 50
        // /* eslint-enable no-magic-numbers */
      };

      return (
        <PlotlyComponent
          data={data}
          layout={Object.assign(
            layout,
            layoutOptions,
            this.props.plotlyOptions
          )}
          config={this.props.plotlyConfig}
          onUpdate={this.props.onRendererUpdate}
        />
      );
    }
  }

  return Renderer;
}
const Plot = createPlotlyComponent(window.Plotly);
const PlotlyRenderers = createPlotlyRenderers(Plot);

const customChart = () => {
  console.log("props", Plot.props);
  return makeRenderer(
    Plot,
    { type: "scatterpolar", hoverinfo: "label+value", textinfo: "none" },
    {},
    true
  );
  // return (
  //   <CustomPlot
  //     data={[
  //       {
  //         type: "scatterpolar",
  //         r: [39, 28, 8, 7, 28, 39],
  //         theta: ["A", "B", "C", "D", "E", "A"],
  //         fill: "toself"
  //       }
  //     ]}
  //     layout={{
  //       polar: {
  //         radialaxis: {
  //           visible: true,
  //           range: [0, 50]
  //         }
  //       },
  //       showlegend: false
  //     }}
  //   />
  // );
};

const data = [
  {
    country: "Spain",
    name: "Santiago",
    surname: "Ramón y Cajal",
    sex: "Male",
    age: 57,
    subject: "Medicine"
  },
  {
    country: "United Kingdom",
    name: "Ada",
    surname: "Lovelace",
    sex: "Female",
    age: 47,
    subject: "Computing"
  },
  {
    country: "United Kingdom",
    name: "Alan",
    surname: "Turing",
    sex: "Male",
    age: 55,
    subject: "Computing"
  },
  {
    country: "France",
    name: "Antoine",
    surname: "Lavoisier",
    sex: "Male",
    age: 12,
    subject: "Chemistry"
  },
  {
    country: "Poland",
    name: "Marie",
    surname: "Curie",
    sex: "Female",
    age: 33,
    subject: "Chemistry"
  },
  {
    country: "Austria",
    name: "Hedy",
    surname: "Lamarr",
    sex: "Female",
    age: 34,
    subject: "Computing"
  },
  {
    country: "Austria",
    name: "Erwin",
    surname: "Schrödinger",
    sex: "Male",
    age: 38,
    subject: "Physics"
  }
];

PlotlyRenderers["Custom Chart"] = customChart({});


// see documentation for supported input formats
//const data = [['attribute', 'attribute2'], ['value1', 'value2']];

const Pivlot1 = props => {

  const [opts, setOpts] = useState({});

  console.log("opts", opts, PivotData);
  useEffect(() => {
    if (!opts.data) return;
    PlotlyRenderers["Custom Chart"] = customChart(opts);
  }, [opts]);

  return (
    <div className="App">
      <PivotTableUI
        data={data}
        onChange={(e) => {
          setOpts(e);
          console.log(e);
        }}
        renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
        cols={["sex"]}
        rows={["subject", "country"]}
        rendererName="Table Heatmap"
        aggregatorName="Sum"
        vals={["age"]}
        derivedAttributes={{ completeName: (el) => el.name + " " + el.surname }}
        {...opts}
      />
    </div>
  );


}


// const comparisonFn = function (prevProps, nextProps) {
//     return prevProps.location.pathname === nextProps.location.pathname;
// };

export default React.memo(Pivlot1);
