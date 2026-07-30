import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

type Props={
data:number[];
color:string;
};

function KPISparkline({

data,

color,

}:Props){

const chartData=data.map((value,index)=>({

index,

value,

}));

return(

<div className="h-10 w-full">

<ResponsiveContainer>

<LineChart data={chartData}>

 <Line type="natural" dataKey="value" stroke={color} strokeWidth={2.5} dot={false}
  isAnimationActive animationDuration={1200}/>

</LineChart>

</ResponsiveContainer>

</div>

);

}

export default KPISparkline;