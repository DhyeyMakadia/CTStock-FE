import { useEffect, useState } from 'react'
import second from './'
import { Grid } from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import MUIDataTable from 'mui-datatables'
import { isAuthenticated } from 'src/utils/helperFunctions'
import { useRouter } from 'next/router'
import { CommonService } from 'src/services/common'

const Dashboard = () => {
  const [data, setData] = useState([])
  const router = useRouter()
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login")
    }
  }, [])
  

  const columns = [
    {
      name: 'product',
      label: 'product',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'brand',
      label: 'brand',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'size',
      label: 'size',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'category',
      label: 'category',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'location',
      label: 'location',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'mark',
      label: 'mark',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'prm',
      label: 'prm',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'com',
      label: 'com',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'rej',
      label: 'rej',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'total',
      label: 'total',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'oneTime',
      label: 'oneTime',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'designName',
      label: 'designName',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'batchShade',
      label: 'batchShade',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'mfgStatus',
      label: 'mfgStatus',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'boxPack',
      label: 'boxPack',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'useCont',
      label: 'useCont',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'baseDesignName',
      label: 'baseDesignName',
      options: {
        filter: true,
        sort: false
      }
    }
  ]

  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiChip: {
          root: {
            backgroundColor: 'red'
          }
        }
      }
    })

  useEffect(() => {
    CommonService.GetClassifiedStocks()
      .then(response => {
        console.log("res", response)
        const responseData = response
        return responseData
      })
      .then(responseData => {
        console.log("resdata", responseData)
        setData(responseData.content)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const options = {
    filterType: 'checkbox'
  }

  return (
    // <iframe width={"100%"} height={"100%"}>
    // </iframe>

    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable title='Classified Stocks' columns={columns} data={data} options={{ filterType: 'checkbox' }} />
    </MuiThemeProvider>
  )
}

export default Dashboard
