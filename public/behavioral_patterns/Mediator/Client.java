public class Client {

    public void operation(){
        ConcreteMediator concreteMediator = new ConcreteMediator();
        ConcreteColleague concreteColleague = new ConcreteColleague(concreteMediator);

        concreteMediator.setConcreteColleague(concreteColleague);

        concreteColleague.operation();
    }
}
