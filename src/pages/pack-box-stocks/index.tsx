import { useEffect, useState } from 'react'
import MUIDataTable from 'mui-datatables'
import { isAuthenticated, signOut } from 'src/utils/helperFunctions'
import { useRouter } from 'next/router'
import { CommonService } from 'src/services/common'

const AfterOrderStocks = () => {
  const [data, setData] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
    }
  }, [])

  const columns = [
    {
      // Done
      name: 'product',
      label: 'product',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      // Done
      name: 'brand',
      label: 'brand',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      // Done
      name: 'size',
      label: 'size',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      // Done
      name: 'category',
      label: 'category',
      options: {
        filter: true,
        sort: false
      }
    },
    // {
    //   name: 'location',
    //   label: 'location',
    //   options: {
    //     filter: true,
    //     sort: false
    //   }
    // },
    {
      // Done
      name: 'mark',
      label: 'mark',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      // Done
      name: 'prm',
      label: 'prm',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      // Done
      name: 'com',
      label: 'com',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      // Done
      name: 'rej',
      label: 'rej',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      // Done
      name: 'total',
      label: 'total',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      // Done
      name: 'oneTime',
      label: 'oneTime',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      // Done
      name: 'designName',
      label: 'designName',
      options: {
        filter: true,
        sort: false
      }
    },
    // {
    //   name: 'batchShade',
    //   label: 'batchShade',
    //   options: {
    //     filter: true,
    //     sort: false
    //   }
    // },
    // {
    //   name: 'mfgStatus',
    //   label: 'mfgStatus',
    //   options: {
    //     filter: true,
    //     sort: false
    //   }
    // },
    // {
    //   name: 'boxPack',
    //   label: 'boxPack',
    //   options: {
    //     filter: true,
    //     sort: false
    //   }
    // },
    {
      // Done
      name: 'packFor',
      label: 'packFor',
      options: {
        filter: true,
        sort: false
      }
    }
    // {
    //   name: 'useCont',
    //   label: 'useCont',
    //   options: {
    //     filter: true,
    //     sort: false
    //   }
    // },
    // {
    //   name: 'baseDesignName',
    //   label: 'baseDesignName',
    //   options: {
    //     filter: true,
    //     sort: false
    //   }
    // }
  ]

  useEffect(() => {
    if (isAuthenticated()) {
      CommonService.GetPackBoxtocks()
        .then(response => {
          console.log('res', response)
          const responseData = response
          return responseData
        })
        .then(responseData => {
          console.log('resdata', responseData)
          setData(responseData.data)
        })
    }
  }, [])

  return (
    <>
      <MUIDataTable
        key={data.length}
        title='Pack Box Stocks'
        columns={columns}
        data={data}
        options={{ filterType: 'checkbox' }}
      />
    </>
  )
}

export default AfterOrderStocks
