public class ConcreteMediator implements Mediator{

    private ConcreteColleague concreteColleague;

    public void setConcreteColleague(ConcreteColleague concreteColleague) {
        this.concreteColleague = concreteColleague;
    }

    @Override
    public void notify(Colleague sender) {
        if(sender instanceof ConcreteColleague){
            reactOnConcreteColleague();
        }
    }

    public void reactOnConcreteColleague(){
        //reaction
        System.out.println("Reaction on ConcreteColleague");
    }
}
