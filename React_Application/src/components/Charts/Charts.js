import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from "moment";



export default class Example extends PureComponent {
static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

render() {
return (

  <ResponsiveContainer width="100%" height="100%">

    <LineChart
      width={300}
      height={200}
      data={this.props.data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 15,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="measurement_date"  tickFormatter={timeStr => moment(timeStr).format('D-M HH:mm')}/>
      <YAxis />
      <Tooltip />
      <Legend dataKey="measurement_name" />
      <Line type="monotone" dataKey="measurement" stroke="#E85E45" activeDot={{ r: 8 }} strokeWidth={3} />
    </LineChart>
  </ResponsiveContainer>
);
}
}
