public class $CONCRETE_MEDIATOR_CLASS_NAME$ implements $MEDIATOR_CLASS_NAME${

    //concrete colleagues
    private ConcreteColleague concreteColleague;

    public void setConcreteColleague(ConcreteColleague concreteColleague) {
        this.concreteColleague = concreteColleague;
    }

    @Override
    public void $NOTIFY_METHOD_NAME$($COLLEAGUE_CLASS_NAME$ sender) {
        if(sender instanceof ConcreteColleague){
            reactOnConcreteColleague();
        }
    }

    public void reactOnConcreteColleague(){
        //reaction on concrete colleague
        System.out.println("Reaction on ConcreteColleague");
    }
}
