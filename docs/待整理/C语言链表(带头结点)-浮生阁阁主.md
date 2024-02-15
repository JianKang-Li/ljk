C语言链表(带头结点)-浮生阁阁主假设h是链表头指针，p是某一节点的指针
可以使用 Lnode *h,*p;  或  linklist h,p;
p->data  指向结点数据
p->next  指向下一个结点
动态申请存储空间 p=(Lnode *)malloc(sizeof(Lnode));
free(p)释放结点内存;
```C
//
// Created by Administrator on 2021/10/8.
//
#include <stdio.h>
#include <stdlib.h>
typedef int elemtype;
typedef struct node//定义结构体并指明结构体名称
{
    elemtype data;//存储数据
    struct node *next;//指向下一个结点
}Lnode,*linklist;//别名

//单链表

//创建链表(头插法，带头指针)
Lnode * creat(int a[])//传入参数可自定义，这里使用数组传参
{
    Lnode *h,*p;
    h=(Lnode *)malloc(sizeof(Lnode));//头结点动态获取内存
    h->next=NULL;//初始化头结点
    int i=0;//辅助赋值
    while(a[i]){//循环赋值
        p=(Lnode *)malloc(sizeof(Lnode));//创建新结点
        p->data=a[i];//赋值
        p->next=h->next;//头插法插入结点
        h->next=p;//移动头结点
        i++;
    }
    return h;//返回头结点
}


//输出链表数据(带头结点时输入参数要去掉头结点)
void print(Lnode *p){
    while(p!=NULL){
        printf("%d ",p->data);
        p=p->next;//移动结点位置
    }
    printf("\n");
}

//求链表长度(带头结点时输入参数要去掉头结点)
int length(Lnode *h){
    Lnode *p;
    p=h;
    int i=0;
    while(p!=NULL){
        p=p->next;
        i++;
    }
    return i;
}

void xs(){//分隔结果
    printf("----------------\n");
}

//链表插入
//插入到某结点后
void insert(Lnode *p,elemtype x){
    Lnode *s;
    s=(Lnode *) malloc(sizeof(Lnode));
    s->data=x;
    s->next=p->next;
    p->next=s;
}

//插入数据到链表的第i个结点之前
int insert(Lnode *h,int i,elemtype x){
    Lnode *p,*s;
    int j;
    p=h;
    j=0;
    while(p&&j<i-1){//寻找第i-1个结点
        p=p->next;
        j++;
    }
    if(p){
        s=(Lnode *) malloc(sizeof(Lnode));
        s->data=x;
        s->next=p->next;
        p->next=s;
        return(1);//正常结束
    }
    else{
        return(0);//插入失败
    }
}

//查找值为x的元素
Lnode * search(Lnode *h,elemtype x){
    Lnode *p;
    p=h->next;
    while(p&&p->data!=x){
        p=p->next;
    }
    return p;
}

//获取第i个元素地址
Lnode * get(Lnode *h,int i){
    int j;
    Lnode *p;
    p=h->next;
    j=1;
    while(p&&j<i){
        p=p->next;
        j++;
    }
    if(j==i){
        return p;
    } else{
        return NULL;
    }
}

//链表逆置
int inverse(Lnode *h){
    Lnode *r,*q,*p;
    p=h->next;
    if(p==NULL){//链表为空
        return 0;
    }else if(p->next==NULL){//只有一个结点
        return 0;
    }
    q=p;
    p=p->next;
    q->next=NULL;
    while(p){
        r=p->next;
        p->next=q;
        q=p;
        p=r;
    }
    h->next=q;
    return 1;
}

//删除链表元素
void dele(Lnode *p){
    Lnode *q;
    if(p->next!=NULL){
        q=p->next;
        p->next=q->next;
        free(q);
    }
}


int main(){
    int a[5]={1,2,3,4,5};
    Lnode *p= creat(a);
    Lnode *q=p->next;
    print(q);
    xs();
    printf("%d\n", length(q));
    xs();
    insert(q,3,2);
    print(q);
    xs();
    Lnode *s= search(q,2);
    printf("%d\n",s->data);
    dele(s);
    xs();
    print(q);
    inverse(p);
    print(p->next);
}
```