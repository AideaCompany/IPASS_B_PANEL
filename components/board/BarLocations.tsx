import { ThemeContext } from '@/providers/ThemeContext'
import { months } from '@/utils/utils'
import { ResponsiveBar } from '@nivo/bar'
import { Select } from 'antd'
import moment from 'moment-timezone'
import React, { useContext } from 'react'
const BarLocations = ({
  dataAnalythicsByLocation,
  onChangeDate
}: {
  dataAnalythicsByLocation?: any[]
  onChangeDate: (date: number) => Promise<void>
}) => {
  // #region provider
  const { theme } = useContext(ThemeContext)
  //#endregion provider

  return (
    <div className="container_bar_locations">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Estadísticas por locación</h2>
        <Select defaultValue={moment().month()} onChange={onChangeDate} placeholder="Selecciona el mes" style={{ width: 300, marginLeft: 10 }}>
          {months.map((e, i) => (
            <Select.Option value={i}>{e}</Select.Option>
          ))}
        </Select>
      </div>

      <ResponsiveBar
        data={
          dataAnalythicsByLocation?.map(e => ({
            ...e,
            Cumplimientos: e.CUMP,
            Incumplimientos: e.INCP,
            'Eventos programados': e.EVEP,
            'Eventos Express': e.EVEE
          })) as any
        }
        keys={['Incumplimientos', 'Cumplimientos', 'Eventos programados', 'Eventos Express']}
        indexBy="location"
        margin={{ top: 10, right: 200, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
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
        layout="vertical"
        groupMode="grouped"
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Locación',
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
        labelTextColor="#000"
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemTextColor: theme === '-dark' ? '#fff' : '#000',
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

export default React.memo(BarLocations)
