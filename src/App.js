import React, {useState, useEffect}from 'react';
import Gig from './Gig';
import './App.css'
import moment, { localeData } from "moment";
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function App(){
const [data, setData] = useState(
  [
    {label: moment().subtract(1, 'days').format('LL'), y: 1000},
    { label: moment().subtract(2, 'days').format('LL'), y: -10943 },
    { label: moment().subtract(2, 'days').format('LL'), y: 4324 },
    { label: moment().subtract(2, 'days').format('LL'), y: -10943 },
    { label: moment().subtract(3, 'days').format('LL'), y: 4324 },
    { label: moment().subtract(4, 'days').format('LL'), y: -10943 },
  ]
  );

  const getDates = () => data.map(pair=> pair.label)
  const getAmounts = () => data.map(pair => pair.y)
  
  const transformData = (groupedData) => {
    const transformedArray = [];
    
    groupedData.forEach(entry => {
      const total = entry[1].reduce((total, pair) => total + pair.y, 0);
      transformedArray.push({date: entry[0], y: total})
    })
    return transformedArray
  }
  
  

  
  const groupBy = (array, key) => {
    array.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;

    }, {});
  }

  console.log(groupBy(data, 'label'))

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    title:{
      text: "Yield"
    },
    axisY: {
      valueFormatString: "N#,##0,",
      includeZero: true
    },
    data: [{
      type: "waterfall",
      yValueFormatString: "$#,##0,.00K",
      indexLabelOrientation: "vertical",
      dataPoints: data
    }]
  }
  const [input, setInput] = useState({
    description: "",
    amount: 0
  });
  const [total, setTotal] = useState(0)

  const [gigs, setGigs] = useState([{
    description: "E.g Landed a job @ Upwork",
    amount: 5000,
    timestamp: new Date()
  }])
  const handleChange =(event) => {

    
    const {name, value} = event.target;
    setInput(input => {
      return {
        ...input, 
        [name]:value
      }
    })

  }
  useEffect(() => {
    const total =gigs.reduce((total, gig) => total+Number(gig.amount), 0);

    setTotal(total)


  }, [gigs])
    const addGig =() =>{
      setGigs([...gigs, {
        description: input.description,
        amount: input.amount
      }])
      setInput({
        description: "",
        amount: ""
      })
      
    }
    

   return (

      <div className="app">
      <CanvasJSChart options = {options}/>
    <div className="title">
    {/* <h1>INCOME TRACKER BAZUK</h1> */}
    

    <p>amount: ${total}</p>
    <input  type="text" name="description" onChange ={handleChange}
     value={input.description} placeholder="Enter description"/>
    <input type="text" name="amount" onChange={handleChange} value={input.amount} placeholder="Amount"/>
    <button disabled={!input.description && !input.amount} onClick ={addGig}> + </button>
    {gigs.map((gigItem) => {
      return <Gig amount ={gigItem.amount} description={gigItem.description}/>
    })}
    </div>
     
   
      
    
       
    
     
     
    </div>
   
  );
}

export default App;
