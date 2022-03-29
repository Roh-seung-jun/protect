let history = [];
let clickAble = false;
let cnt = 0;
let removeEle = null;

$(()=>{
    cardLoad();
    $(document)
        .on('click','.review_submit',function(){
            const name =$('input[name="name"]').val();
            const shop =$('input[name="shop"]').val();
            const product =$('input[name="product"]').val();
            const purchase =$('input[name="purchase"]').val();
            const contents =$('.contents').val();
            const score =$('input[name="score"]').val();
            const file =$('#file').val();
            if(!name||!shop||!product||!purchase||!contents||!score||!file)return alert('필수 입력값이 누락되었습니다.');
            const nameReg = /^[가-힣ㄱ-ㅎa-zA-Z]+$/;
            if(!nameReg.test(name))return alert('이름은 영어와 한글만 포함하실 수 있습니다.');
            if(contents.length < 100)return alert('내용은 100자 이상이여야 합니다.');
            alert('구매 후기가 등록되었습니다.');
        })
        .on('click','.add_file',function(){
            $('.file').append(
                `<input type="file" name="file" class="form-control-file" accept=".jpg">
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
            alert('이벤트에 참여해주셔서 감사합니다');
            $('.close').click();
            $('.stamp img')[0].src = './img/stamp_1.png';
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
    let time = 90;
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
    const data = await fetch('./js/data.json').then(res=>res.json());
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
                        src="./img/card.png" alt=""></div>
                <div class="back position-absolute w-100 h-100 d-flex justify-content-center align-items-center"><img
                        src="./special/${e.area}_${e.most}.jpg" alt="" class="position-absolute" style="z-index: -13"><p class="m-0 d-none">${e.area}</p></div>
            </div>
        </div>`
    })
    $('.card_list').html(text);
}

const endGame = () =>{
    $('#card_modal').modal('show');
    $('input[name="score"]').val(cnt);
}