public class $CLIENT_CLASS_NAME$ {

    public void operation(){
        $CONCRETE_MEDIATOR_CLASS_NAME$ concreteMediator = new $CONCRETE_MEDIATOR_CLASS_NAME$();
        ConcreteColleague concreteColleague = new ConcreteColleague(concreteMediator);

        concreteMediator.setConcreteColleague(concreteColleague);

        concreteColleague.$OPERATION_METHOD_NAME$();
    }
}
