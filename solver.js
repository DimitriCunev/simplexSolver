


//----------------Simplex Solver by Cunev S.Dmitri----------------
// Table solving reproduction.

let transpose = m => m[0].map((x,i) => m.map(x => x[i]))

// let cb = [0,0]
// let po = [10,8]
// let co = [2,-1,-3,0,0]
// let arr = [
//     [1,1,2,1,0],
//     [3,-1,2,0,1]
// ]
// let base = [4,5]
function simplex(arr,cb,po,co,n,ress,oix,fox){
    
        
    
    console.log(`\n\n====================Iteration ${n}====================`)
    let res = []


    let tarr = []
    let oi = []
    arr.forEach((r,j)=>{
        tarr.push([])
        r.forEach(e=>{
            tarr[tarr.length-1].push(e*cb[j])
        })
    })
    tarr = transpose(tarr)
    tarr.forEach((e,i)=>{
        let sum = 0
        e.forEach(el=>{
            sum+=el
        })
        sum=sum-co[i]
        res.push(sum)
    })
    let fxo = 0
    po.forEach((e,i)=>{
        fxo+=e*cb[i]
    })

    console.log(`fxo: ${fxo}`)
    console.log(`res: ${res}`)

    let contin = false;
    let max = 0
    let maxindex = 0
    res.forEach((e,i)=>{
        if(e>0){
            contin = true
            if(e>max) {max = e;maxindex = i}
        }
    })
    if(contin){
        console.log(`Found positive res, continuing at index ${maxindex+1} with value ${max}; \nCalculating Oi`)
        let arrt = transpose(arr)
        let maxrow = arrt[maxindex]
        arrt[maxindex].forEach((e,i)=>{if(e===0){console.log('Division by 0, something went wrong')} else {oi.push(po[i]/e)}})
        let mino = Infinity;
        let minoi = -1
        oi.forEach((e,i)=>{
            if(e>0){
                if(mino>e){
                    mino = e
                    minoi = i
                }
            }
        })
        console.log(oi)
        if(minoi!=-1){
            console.log(`Found smallest positive oi, ${mino} at index ${minoi+1}`)
            console.log(`\n> The next pivot would be ${arr[minoi][maxindex]} at [${minoi+1},${maxindex+1}]`)
            console.log(`\n> Reducing row [${maxrow}] with pivot at index ${minoi+1}`)
            let pivot = arr[minoi][maxindex]
            let pivotp = {y:minoi,x:maxindex}
            lpivot = pivotp
            let rarr = []
            let opo = []
            maxrow.forEach((r,i)=>{
                if(i!=minoi){
                    rarr.push([])
                    let deltaval = -(r/pivot)
                    console.log(`<OP> Adding L${pivotp.y+1}*${deltaval} to ${i+1}`)
                    opo.push(po[i]+po[pivotp.y]*deltaval)
                    arr[pivotp.y].forEach((e,j)=>{
                        rarr[rarr.length-1].push(e*deltaval+arr[i][j])
                    })
                } else {
                    rarr.push([])
                    opo.push(po[i]*(1/arr[minoi][maxindex]))
                    arr[pivotp.y].forEach((e,j)=>{
                        rarr[rarr.length-1].push(e*(1/arr[minoi][maxindex]))
                    })
                }
                
            })
    
            console.log(`<OP> Multiplying line ${minoi+1} by 1/${arr[minoi][maxindex]}`)
    
            console.log('\n\n')
            console.log(rarr)
            console.log(`New PO = ${opo}`)
            showStep({x:100,y:((y+2)*30)*(n+1)},arr,cb,po,co,res,oi,fxo)
            console.log(`\n<INSERT> CO: ${co[pivotp.x]} to Cb index ${pivotp.y}`)
            base[pivotp.y] = pivotp.x+1
            cb[pivotp.y] = co[pivotp.x]
            console.log(cb)

            console.log('Repeating algorithm, next path ->')
            
            simplex(rarr,cb,opo,co,n+1,res,oi,fxo)
            
            // 
    
        } else {
            console.log(`No positives found, aborting.`)
        }
    } else {
        console.log('\n\n[SUCCESS] Stopped algorithm, found solution.')
        console.log(`>Po: ${po}`)
        console.log(`>Cb: ${cb}`)
        // console.log(`With main variables ${base}`)
        let optisol = []
        co.forEach((e,i)=>{
            optisol.push(0)
        })
        base.forEach((e,i)=>{
            optisol[e-1] = po[i]
        })
        // console.log(`x.opt = `,optisol)
        showStep({x:100,y:((y+2)*30)*(n+1)},arr,cb,po,co,res,oi,fxo)

    }
   
}
// simplex(arr,cb,po,co,1)