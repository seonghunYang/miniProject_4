# 📰 뉴스 끌올(ing)
바쁜 일상속의 작은 쉼표(,)  
키워드별 뉴스 정기 구독 서비스 **뉴스 끌올(ing)**
***
## :black_small_square: 기획
> 현대인들은 누구나 바쁜 일상속에서 살아갑니다.  
> 그러한 일상속에서 잠시나마 머리를 식힐 핑계가 필요합니다.  
> 저희 **뉴스 끌올(ing)** 은 휴식을 위한 핑계가 되어드립니다.  
> 주기적으로 뉴스를 받으시고 잠시 뉴스를 보며 휴식을 취해보시는건 어떨까요?  
***
## :black_small_square: 사용방법
##### 1. 뉴스를 끌올(ing) 하실 시간 또는 주기를 선택해주세요!
> <p align="left"><img src="https://user-images.githubusercontent.com/42955392/116554507-3821cf00-a936-11eb-9e0e-9cdd0419dd0a.PNG" width="20%">
> <img src="https://user-images.githubusercontent.com/42955392/116555000-d2821280-a936-11eb-8ea3-3e93dc38bd40.PNG" width="20%"></p>
>
##### 2. 끌올(ing) 하실 뉴스의 키워드를 선택해주세요!  
> <p align="left"><img src="https://user-images.githubusercontent.com/42955392/116555295-2e4c9b80-a937-11eb-833e-1e7987e582bd.PNG" width="20%"></p>
> 
>> 종합, 시사, 스포츠, 연예, 정치, 사회, 세계, IT 중에 선택하세요  
>> 인기도 순으로 5개의 뉴스를 보내드립니다.
>
> <p align="left"><img src="https://user-images.githubusercontent.com/42955392/116555340-3c022100-a937-11eb-9f6c-96dc355d2bc8.PNG" width="20%">
> <img src="https://user-images.githubusercontent.com/42955392/116555408-50deb480-a937-11eb-9833-3f0af1ec77c0.PNG" width="20%"></p>
>
##### 3. 키워드에 맞는 예시 뉴스 5개의 URL이 날아 왔다면 구독 성공!  
> <p align="left"><img src="https://user-images.githubusercontent.com/42955392/116555636-9602e680-a937-11eb-8b5e-af1d029cfd88.PNG" width="20%">

##### 4. 이제 설정한 시간에 맞춰 뉴스 5개씩 보내드립니다! 
***
## :black_small_square: 시나리오
1. [서버] 유저 조회
2. [서버] 조회된 모든 유저에게 각각 채팅방 생성 후 뉴스 끌올(ing) 메세지 전송
3. [유저] 메세지를 통해 시간설정 모달 띄움 (/request)
4. [유저] 시간설정 모달을 통해 뉴스 구독 시간을 전송 (/callback)
5. [서버] 시간을 전달받은 유저에게 뉴스 키워드 설정 메세지 전송
3. [유저] 메세지를 통해 키워드설정 모달 띄움 (/request)
4. [유저] 키워드설정 모달을 통해 뉴스 키워드를 전송 (/callback)
6. [서버] 설정된 시간에 키워드에 해당하는 뉴스의 URL을 유저에게 전송


