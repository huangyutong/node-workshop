const twseData = response.data
        if (twseData.stat !== 'OK') {
            throw '從證交所從證交所查詢的資料有問題'
        }
        let dataItem = twseData.data.map((item) => {
            // console.log(dataItem)
            // 拿掉日期斜線
            item = item.map((val) => {
                return val.replace(/,/g, '')
            })
            // 轉西元年,將字串轉數字才能加減乘除,parseInt轉數字
            item[0] = parseInt(item[0].replace(/\//g, ''), 10) + 19110000

            // 把stock_id放進去
            item.unshift(stockCode)
            return item
        })
        console.log(dataItem)
