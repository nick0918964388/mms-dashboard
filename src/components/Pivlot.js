import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import PivotTable from 'react-pivottable/PivotTable';
import $ from 'jquery';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from 'react-plotly.js';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import CustomerService from '../service/CustomerService';
import ProductService from '../service/ProductService';






// see documentation for supported input formats
//const data = [['attribute', 'attribute2'], ['value1', 'value2']];

const Pivlot = props => { 
    const [state, setState] = useState(null)
    const [data, setdata] = useState([])
    const [rows, setrows] = useState([])
    const [cols, setcols] = useState([])
    const [hiddenAttributes, sethiddenAttributes] = useState([])
    const [aggregatorName, setaggregatorName] = useState()
    const [coltotalName, setcolTotalName] = useState('')
    const [vals, setvals] = useState()

    
    const customerService = new CustomerService();
    const productService = new ProductService();
    useEffect(() => {
        if(props.charttype!=null){
            if(props.charttype==="m01"){
                customerService.getCustomersTym(props.type).then(data => setdata(data));  
                setcols();
                setaggregatorName();
                setvals();
                setvals();
                setcolTotalName('Totals');
            }
            else if(props.charttype==="tym-wocloserate"){
                customerService.getCustomersTym_wocloserate(props.type).then(data => setdata(data));
                setrows(["工單類型","單位"]);
                setcols([]);
                setaggregatorName("工單結案率");
                setvals();
                sethiddenAttributes(["已結案數","日","總結案數"]);
                setcolTotalName('結案率(%)');
            }
            else if(props.charttype==="tym-srcloserate"){
                customerService.getCustomersTym_srcloserate(props.type).then(data => setdata(data));
                setrows(["單位"]);
                setcols([]);
                setaggregatorName("結案率");
                setvals();
                sethiddenAttributes(["已結案數","日","總結案數"]);
                setcolTotalName('結案率(%)');
            }
             
        }          
        
        
    }, [props]); 
    const filterTableRenderers = (data) => {
                
    }
   
    // create Plotly renderers via dependency injection
    const PlotlyRenderers = createPlotlyRenderers(Plot);
    
    console.log("TableRenderers=>",TableRenderers);
    // debugger;
    delete TableRenderers["Table Heatmap"];
    delete TableRenderers["Table Row Heatmap"];
    delete TableRenderers["Table Col Heatmap"];
    // delete TableRenderers["Exportable TSV"];    
    const aa = TableRenderers["Table"];
    console.log('TableRenderers=>',aa);
    delete aa.defaultProps.aggregators["Average"];
    delete aa.defaultProps.aggregators["Count Unique Values"];
    delete aa.defaultProps.aggregators["Count as Fraction of Columns"];
    delete aa.defaultProps.aggregators["Count as Fraction of Rows"];
    delete aa.defaultProps.aggregators["Count as Fraction of Total"];
    delete aa.defaultProps.aggregators["First"];
    // delete aa.defaultProps.aggregators["Integer Sum"];
    delete aa.defaultProps.aggregators["Last"];
    // delete aa.defaultProps.aggregators["List Unique Values"];
    delete aa.defaultProps.aggregators["Maximum"];
    delete aa.defaultProps.aggregators["Median"];
    delete aa.defaultProps.aggregators["Minimum"];
    delete aa.defaultProps.aggregators["Sample Standard Deviation"];
    delete aa.defaultProps.aggregators["Sample Variance"];    
    // delete aa.defaultProps.aggregators["Sum"];
    // delete aa.defaultProps.aggregators["Sum as Fraction of Columns"];
    // delete aa.defaultProps.aggregators["Sum as Fraction of Rows"];
    // delete aa.defaultProps.aggregators["Sum as Fraction of Total"];
    delete aa.defaultProps.aggregators["Sum over Sum"];
    
    console.log('first==>',aa.defaultProps.aggregators["Sum"]);
    

    aa.defaultProps.aggregators["工單結案率"] = customaggregators();
    console.log('工單結案率==>',aa.defaultProps.tableOptions);
    aa.defaultProps.tableOptions.colTotalName=coltotalName;
    
    
    function customaggregators() {
        return function([attr]) {           
            return function() {
                return {
                    sumSuccesses: 0,
                    sumTrials: 0,
                    push: function (record) {
                        // console.log("record =>", record);
                        if (!isNaN(parseFloat(record.已結案數))) {
                            this.sumSuccesses += parseFloat(record.已結案數);
                        }
                        if (!isNaN(parseFloat(record.總結案數))) {
                            return this.sumTrials += parseFloat(record.總結案數);
                        }
                    },
                    value: function () { return ((this.sumSuccesses / this.sumTrials)*100).toFixed(2); },
                    format: function (x) { 
                        console.log('format=>',x);

                        return x+'%'; 
                    },
                    numInputs: 0
                };
            };
          };
    };


    
    const successrate = () => {
        return {
            sumSuccesses: 5,
            sumTrials: 10,
            push: function (record) {
                console.log("record =>", record);
                // if (!isNaN(parseFloat(record.已結案數))) {
                //     this.sumSuccesses += parseFloat(record.已結案數);
                // }
                // if (!isNaN(parseFloat(record.總結案數))) {
                //     return this.sumTrials += parseFloat(record.總結案數);
                // }
            },
            value: function () { return this.sumSuccesses / this.sumTrials; },
            format: function (x) { return x; },
            numInputs: 0
        };
    };
    
    return (
        <div className="grid table-demo">
            <div className="col-12">
            <PivotTableUI
                data={data}
                onChange={s => setState(s)}  
                rows={rows} 
                cols={cols}
                aggregatorName={aggregatorName}
                vals={vals}
                hiddenAttributes={hiddenAttributes}                
                // derivedAttributes={{ wocloserate: (data) => data.已結案數 / data.總結案數}}                                  
                renderers={Object.assign({}, TableRenderers)}//, PlotlyRenderers)}                            
                {...state}
            />        
            </div>
        </div>
    );


}


// const comparisonFn = function (prevProps, nextProps) {
//     return prevProps.location.pathname === nextProps.location.pathname;
// };

export default React.memo(Pivlot);
