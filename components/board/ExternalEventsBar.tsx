import { ThemeContext } from '@/providers/ThemeContext'
import { ResponsiveBar } from '@nivo/bar'
import React, { useContext } from 'react'

const ExternalEventsBar = ({ dataEvents }: { dataEvents: any[] }) => {
  // #region provider
  const { theme } = useContext(ThemeContext)
  //#endregion provider

  return (
    <div className="container_bar">
      <h2>Eventos Externos</h2>

      <ResponsiveBar
        data={dataEvents.map(e => ({ ...e, 'Eventos Programados': e.Eventos, 'Eventos Express': e.EventosExpress })) as any}
        keys={['Eventos Programados', 'Eventos Express']}
        indexBy="month"
        margin={{ top: 10, right: 150, bottom: 50, left: 80 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        groupMode="grouped"
        theme={{
          textColor: theme === '-dark' ? '#fff' : '#000',
          grid: {
            line: {
              stroke: theme === '-dark' ? '#323232' : '#EBEBEB'
            }
          },
          tooltip: {
            basic: {
              background: theme === '-dark' ? '#323232' : '#fff'
            },
            container: {
              background: theme === '-dark' ? '#323232' : '#fff'
            }
          }
        }}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Mes',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Cantidad',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) {
          return e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
        }}
      />
    </div>
  )
}

export default React.memo(ExternalEventsBar)
