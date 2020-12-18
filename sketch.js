let input, button, greeting;

function setup() {
  // create canvas
  createCanvas(0, 0);

  input1 = createInput();
  input1.position(20, 65);
  input1.value(5)
  input2 = createInput();
  input2.value(2)
  input2.position(20, 105);

  button = createButton('submit');
  button.position(input1.x + input1.width+20, 65);
  button.mousePressed(greet);

  greeting = createElement('h2', 'Rezolvarea problemelor de min/max cu metoda Simplex.<br>Realizat de Cunev S. Dmitri  -- https://github.com/DimitriCunev<br>Prof. Marius Spinu');
  greeting.position(20, 155);

  textAlign(CENTER);
  textSize(50);
}

let x=0,y=0
let ok
function greet() {
    
    x = parseInt(input1.value())
    y = parseInt(input2.value())
    if(!isNaN(x)&&!isNaN(y)){
        input1.remove();input2.remove();greeting.remove();button.remove()
        ok = createButton('start')
        ok.mousePressed(()=>{solvefor()});
        start()
    } else {
        // greeting.html('Rezolvarea problemelor de min/max cu metoda Simplex')
    }

}

let inputs = []
let cos = []
let cbs = []
let pos = []
let ois = []
let ress = []
let fos
let os = {x:100,y:100}
let str = ''
function start(){
    let ocon = console.log
    console.log = (...args)=>{
        str+='<br>'
        args.forEach(e=>{
            str+='<br>'+e
        })
        greeting.html(str)
        ocon(...args)
    }
    greeting = createElement('h5', '');
    greeting.position(360, 25);
    for (let j = 0; j < y; j++) {
        inputs.push([])
        for (let i = 0; i < x; i++) {
            inputs[inputs.length-1].push(createInput().size(30,30).position(os.x+i*30,os.y+j*30))
        }
        
    }

    for (let i = 0; i < x; i++) {
        cos.push(createInput().size(30,30).position(os.x+i*30,os.y-30).attribute('placeholder', 'co'))
    }
    for (let i = 0; i < y; i++) {
        cbs.push(createInput().size(30,30).position(os.x-60,os.y+i*30).attribute('placeholder', 'cb'))
    }
    for (let i = 0; i < y; i++) {
        pos.push(createInput().size(30,30).position(os.x-30,os.y+i*30).attribute('placeholder', 'po'))
    }

    for (let i = 0; i < y; i++) {
        ois.push(createInput().size(30,30).position(os.x+30*x,os.y+i*30).attribute('placeholder', 'oi').attribute('disabled', 'true'))
    }
    for (let i = 0; i < x; i++) {
        ress.push(createInput().size(30,30).position(os.x+i*30,os.y+y*30).attribute('placeholder', 'r').attribute('disabled', 'true'))
    }
    fos = createInput().size(30,30).position(os.x-30,os.y+y*30).attribute('placeholder', 'fx').attribute('disabled', 'true')
    
}
let base = [0,0]
function solvefor(){
   
        let m = []
        let co = []
        let cb = []
        let po = []
        inputs.forEach(e=>{
            m.push([])
            e.forEach(j=>{
                m[m.length-1].push(parseFloat(j.value()))
            })
        })

        cos.forEach(e=>{
            co.push(parseFloat(e.value()))
        })
        cbs.forEach(e=>{
            cb.push(parseFloat(e.value()))
        })
        pos.forEach(e=>{
            po.push(parseFloat(e.value()))
        })
        console.log(m)
        console.log(co)
        console.log(cb)
        console.log(po)
        simplex(m,cb,po,co,1,[],[],[])
    
}

function showStep(oss,arr,cb,po,co,res,oix,fox){
    
    let inputs = []
    let cos = []
    let cbs = []
    let pos = []
    let ois = []
    let ress = []
    let fos
    for (let j = 0; j < y; j++) {
        inputs.push([])
        for (let i = 0; i < x; i++) {
            inputs[inputs.length-1].push(createInput().size(30,30).position(oss.x+i*30,oss.y+j*30).value(arr[j][i]))
        }
        
    }

    for (let i = 0; i < x; i++) {
        cos.push(createInput().size(30,30).position(oss.x+i*30,os.y-30).attribute('placeholder', 'co').attribute('disabled', 'true').value(co[i]))
    }
    for (let i = 0; i < y; i++) {
        cbs.push(createInput().size(30,30).position(oss.x-60,oss.y+i*30).attribute('placeholder', 'cb').attribute('disabled', 'true').value(cb[i]))
    }
    for (let i = 0; i < y; i++) {
        pos.push(createInput().size(30,30).position(oss.x-30,oss.y+i*30).attribute('placeholder', 'po').attribute('disabled', 'true').value(po[i]))
    }

    for (let i = 0; i < y; i++) {
        ois.push(createInput().size(30,30).position(oss.x+30*x,oss.y+i*30).attribute('placeholder', 'oi').attribute('disabled', 'true').value(oix[i]))
    }
    for (let i = 0; i < x; i++) {
        ress.push(createInput().size(30,30).position(oss.x+i*30,oss.y+y*30).attribute('placeholder', 'r').attribute('disabled', 'true').value(res[i]))
    }
    fos = createInput().size(30,30).position(oss.x-30,oss.y+y*30).attribute('placeholder', 'fx').attribute('disabled', 'true').value(fox)
}
