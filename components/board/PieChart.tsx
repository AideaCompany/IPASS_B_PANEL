import { ThemeContext } from '@/providers/ThemeContext'
import { listAttemptsMonthExternalFn, listAttemptsMonthInternalFn } from '@/services/locationAttempts'
import { ResponsivePie } from '@nivo/pie'
import React, { useContext, useEffect, useState } from 'react'
// import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

const PieChartComp = () => {
  const { theme } = useContext(ThemeContext)

  const [dataInternal, setDataInternal] = useState<any[]>([])
  const [dataExternal, setDataExternal] = useState<any[]>([])

  const getData = async () => {
    const monthInternal = await listAttemptsMonthInternalFn()
    const monthExternal = await listAttemptsMonthExternalFn()

    var initExternal
    if (monthExternal.length > 0) {
      var incumplimiento = 0
      const cumplimiento = monthExternal.filter(item => item.authenticated === true).length
      incumplimiento = monthExternal.map(item => item.attempts).reduce((prev, next) => prev + next)
      initExternal = [
        { id: 'Cumplimiento', label: 'Cumplimiento', value: cumplimiento },
        { id: 'Incumplimiento', label: 'Incumplimiento', value: incumplimiento }
      ]
    } else {
      initExternal = [] as any
    }

    var initInternal
    if (monthInternal.length > 0) {
      var incumplimiento = 0
      const cumplimiento = monthInternal.filter(item => item.authenticated === true).length
      incumplimiento = monthInternal.map(item => item.attempts).reduce((prev, next) => prev + next)
      initInternal = [
        { id: 'Cumplimiento', label: 'Cumplimiento', value: cumplimiento },
        { id: 'Incumplimiento', label: 'Incumplimiento', value: incumplimiento }
      ]
    } else {
      initInternal = [] as any
    }
    setDataInternal(initInternal)
    setDataExternal(initExternal)
  }

  useEffect(() => {
    getData()
    const interval = setInterval(() => {
      getData()
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="pieContainer">
      {dataExternal.length > 0 ? (
        <div className="infoChart">
          <h2>Externos</h2>
          <ResponsivePie
            data={dataExternal}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={10}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            theme={{
              textColor: theme === '-dark' ? '#fff' : '#000',
              annotations: {
                text: {
                  color: theme === '-dark' ? '#fff' : '#000'
                }
              }
            }}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={theme === '-dark' ? '#fff' : '#000'}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: theme === '-dark' ? '#fff' : '#000',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: theme === '-dark' ? '#fff' : '#000'
                    }
                  }
                ]
              }
            ]}
          />
        </div>
      ) : (
        <div className="infoChart">
          <p>No hay intentos EXTERNOS para este mes</p>
        </div>
      )}

      {dataInternal.length > 0 ? (
        <div className="infoChart">
          <h2>Internos</h2>
          <ResponsivePie
            data={dataInternal}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={theme === '-dark' ? '#fff' : '#000'}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: theme === '-dark' ? '#fff' : '#000',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: theme === '-dark' ? '#fff' : '#000'
                    }
                  }
                ]
              }
            ]}
          />
        </div>
      ) : (
        <div className="infoChart">
          <h2>No hay intentos INTERNOS para este mes</h2>
        </div>
      )}
    </div>
  )
}

export default React.memo(PieChartComp)
