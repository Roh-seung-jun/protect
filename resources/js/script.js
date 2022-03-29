let history = [];
let clickAble = false;
let cnt = 0;
let removeEle = null;

$(()=>{
    cardLoad();
    $(document)
        .on('click','.review_submit',async function(){
            const name =$('input[name="name"]').val();
            const shop =$('input[name="shop"]').val();
            const product =$('input[name="product"]').val();
            const purchase =$('input[name="purchase"]').val();
            const contents =$('.contents').val();
            const score =$('input[name="score"]').val();
            const file =$('#file').val();
            console.log(!name,!shop,!product,!purchase,!contents,!score,!file);
            if(!name||!shop||!product||!purchase||!contents||!score||!file)return alert('필수 입력값이 누락되었습니다.');
            const nameReg = /^[가-힣ㄱ-ㅎa-zA-Z]+$/;
            if(!nameReg.test(name))return alert('이름은 영어와 한글만 포함하실 수 있습니다.');
            if(contents.length < 100)return alert('내용은 100자 이상이여야 합니다.');

            let files = document.querySelectorAll('.file-input');
            let file_data = [];
            for( let i = 0 ; i < files.length ; i++){
                let _file = await fileRead(files[i].files[0]);
                let img = await drawImg($(`<img src="${_file}" alt="">`)[0]);
                file_data.push(img);
            }
            console.log(file_data);
            $.ajax({
                data : {
                    name,
                    contents,
                    shop,
                    product,
                    score,
                    'purchase-date' : purchase,
                    files : file_data,
                    _token : $('meta[name="token"]').attr('content')
                },
                url : '/review',
                type : 'post',
                success:function(res){
                    console.log(res);
                }
            })
            alert('구매 후기가 등록되었습니다.');
        })
        .on('click','.add_file',function(){
            $('.file').append(
                `<input type="file" name="file" class="form-control-file file-input" accept=".jpg">
                `
            )
        })
        .on('mousemove','input.star',function(e){
            $(this).val(Math.floor(e.offsetX /15));
            document.querySelector('.star span').style.width = `${this.value * 10}%`;
        })
        .on('click','.review_open',function(){
            $('#review_modal').modal('show');
        })
        .on('click','.close',function(){
            $('.modal').modal('hide');
        })
        .on('click','.card_submit',function(){
            const name = $('input[name="name"]').val();
            const phone = $('input[name="phone"]').val();
            const score = $('input[name="score"]').val();
            if(name.length < 2 )return alert('이름은 두글자 이상이여야 합니다.');
            if(name.length > 50 )return alert('이름은 50자 이하이여야 합니다.');
            const nameReg = /^[가-힣ㄱ-ㅎa-zA-Z]+$/;
            if(!nameReg.test(name))return alert('이름은 영어와 한글만 포함하실 수 있습니다.');
            if(phone.length < 13)return alert('휴대전화 형식에 어긋납니다.(010-0000-0000)');
            $('.close').click();
            $.ajax({
                url : '/event',
                type : 'post',
                data : {
                    _token : $('meta[name="token"]').attr('content'),
                    name,
                    phone,
                    score
                },
                success: function(res){
                    alert(res[0]);
                    $('.stamp img')[0].src = `./public/img/stamp_${res[1]}.png`;
                }
            })
        })
        .on('keydown keyup change onpaste','input[name="phone"]',function(){
            const val = $(this).val();
            if(val.length > 13){
                return this.value = val.slice(0,13);
            }
            this.value = val.replace(/[^0-9]/g,'').replace(/(\d{0,3})(\d{0,4})(\d{0,4})$/g,'$1-$2-$3').replace(/\-{1,2}$/g,'')
        })
        .on('click','.start',function(){
            count();
            clickAble = true;
            cardView(5000);
            $('.reload')[0].classList.remove('d-none');
            this.classList.add('d-none');
        })
        .on('click','.hint',function(){
            cardView(3000);
        })
        .on('click','.reload',function(){
            gameSet();
        })
        .on('click','.card_event',function(){
            if(!clickAble) return;
            if(removeEle === this) return;
            this.classList.add('change');
            history.push($(this).attr('data-id'));
            clickAble = false;
            if(history.length === 1){
                removeEle = this;
                setTimeout(()=>{
                    if(history.length === 1 && history[0] === $(removeEle).attr('data-id')){
                        this.classList.remove('change');
                        history = [];
                    }
                },3000)
                clickAble = true;
            }

            if(history.length === 2){
                if(history[0] === history[1]){
                    cnt++;
                    removeEle.classList.add('end');
                    this.classList.add('end');
                    $(this).find('p')[0].classList.remove('d-none');
                    $(removeEle).find('p')[0].classList.remove('d-none');
                    clickAble = true;
                    if(cnt === 8)endGame();
                }else{
                    setTimeout(()=>{
                        removeEle.classList.remove('change');
                        this.classList.remove('change');
                        clickAble = true;
                    },1000)
                }
                history = [];

            }
        })
})

const fileRead = (file) =>{
    return new Promise((res)=>{
        let reader = new FileReader();
        reader.onload = () =>{
            res(reader.result);
        }
        reader.readAsDataURL(file);

    })
}

const drawImg = (img) => {
    const canvas = $('<canvas>')[0];
    const ctx = canvas.getContext('2d');
    canvas.width = 450;
    canvas.height = 450;
    ctx.drawImage(img,0,0,450,450);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'center';
    ctx.font = '18px'
    ctx.fontStyle = 'rgba(0,0,0,.5)';
    ctx.fillText('경상남도 특산품',225,255);
    return canvas.toDataURL();
}
const gameSet = async () =>{
    let history = [];
    let clickAble = false;
    let cnt = 0;
    let removeEle = null;
    count();
    await cardLoad();
    await cardView(5000);
}
const count = () =>{
    let time = 1;
    let wait = 5;
    let inter = setInterval(';');
    for (let i = 0 ; i < inter;i++){
        clearInterval(i);
    }
    let set = setInterval(()=>{
        if(wait > 0){
            $('.time').html('시작까지 남은시간 '+wait+'초')
            wait--;
        }else{
            if(time < 60){
                $('.time').html('남은시간 : '+time+'초')
            }else{
                $('.time').html('남은시간 : 1분'+(time-60)+'초')
            }
            time--;
        }
        $('.count').html(`찾은 개수 : ${cnt}`);
        if(time === 0) {
            clearInterval(set)
            endGame();
        }
    },1000)
}



const cardView = (time) =>{
    clickAble = false;
    const data = document.querySelectorAll('.card_event');
    data.forEach((e,idx)=>{
        setTimeout(()=>{
            e.classList.add('change');
        },100*idx)
    })
    data.forEach((e,idx)=>{
        setTimeout(()=>{
            e.classList.remove('change');
        },time + 100*idx)
        clickAble = true;

    })
}



const cardSet = async () =>{
    const data = await fetch('../resources/js/data.json').then(res=>res.json());
    let arr = [];
    for( let i = 0 ; i < 8 ;i++){
        const random = Math.floor(Math.random() * data.length);
        arr.push(data[i],data[i]);
        data.splice(random,1);
    }
    return arr.sort(()=>Math.random() - .5);
}



const cardLoad = async () =>{
    const cardData = await cardSet();
    let text = '';
    cardData.forEach(e=>{
        text += `
        <div class="card">
            <div class="card_event w-100 h-100" data-id="${e.area}">
                <div class="front position-absolute w-100 h-100 d-flex justify-content-center align-items-center"><img
                        src="./public/img/card.png" alt=""></div>
                <div class="back position-absolute w-100 h-100 d-flex justify-content-center align-items-center"><img
                        src="./public/special/${e.area}_${e.most}.jpg" alt="" class="position-absolute" style="z-index: -13"><p class="m-0 d-none">${e.area}</p></div>
            </div>
        </div>`
    })
    $('.card_list').html(text);
}

const endGame = () =>{
    $('#card_modal').modal('show');
    $('input[name="score"]').val(cnt);
}
