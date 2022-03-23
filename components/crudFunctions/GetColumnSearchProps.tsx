import React, { useState, useContext } from 'react'
import { Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
//context
import { ThemeContext } from '@/providers/ThemeContext'

const GetColumnSearchProps = (dataIndex: any, translations: any, name: string, customRender?: (render: any) => any, filteredValue?: any): object => {
  //States
  const [searchText, setSearchText] = useState<string>('')
  const [searchedColumn, setSearchedColumn] = useState<string>('')

  //Context
  const { theme } = useContext(ThemeContext)

  //Functions
  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }
  const handleReset = (clearFilters: any) => {
    clearFilters()
    setSearchText('')
  }

  return {
    filterDropdown: (props: { setSelectedKeys: any; selectedKeys: any; confirm: any; clearFilters: any }) => {
      const { setSelectedKeys, selectedKeys, confirm, clearFilters } = props
      return (
        <div className={`searchContainer${theme}`} style={{ padding: 8 }}>
          <Input
            ref={node => {
              //  searchInput = node;
            }}
            placeholder={`${translations.search} ${name?.toLocaleLowerCase()}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            {translations.search}
          </Button>
          <Button
            shape={'round'}
            onClick={() => {
              handleReset(clearFilters)
            }}
            size="small"
            style={{ width: 90 }}
          >
            {translations.cancel}
          </Button>
        </div>
      )
    },
    filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: any, record: any) => {
      return customRender
        ? customRender(record[dataIndex])?.toString()?.toLowerCase()?.includes(value?.toLowerCase())
        : record[dataIndex]?.toString()?.toLowerCase()?.includes(value?.toLowerCase())
    },
    render: (text: any, test: any) => {
      return searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={customRender ? customRender(text)?.toString() : text?.toString()}
        />
      ) : customRender ? (
        customRender(text)
      ) : (
        text
      )
    }
  }
}

export default GetColumnSearchProps
