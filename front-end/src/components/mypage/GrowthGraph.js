import { ResponsiveLine } from '@nivo/line'

const MyResponsiveLine = ({ data /* see data tab */ }) => (
  <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle'
      }}
      axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle'
      }}
      enableGridX={false}
      colors={{ scheme: 'nivo' }}
      pointSize={10}
      pointColor={{ from: 'color', modifiers: [] }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      enablePointLabel={true}
      pointLabel="y"
      pointLabelYOffset={-11}
      enableArea={true}
      useMesh={true}
      legends={[]}
  />
)