import React from "react";
import axios from "axios";
import proxy from "http-proxy-middleware";
import {db} from "../firebaseConfig";
import { filter } from 'rxjs/operators';
import { collectionData } from 'rxfire/firestore';
import 'firebase/firestore';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Table,
  Media,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";

class addPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', players: [], searchText: ''};
        this.playersData = [];
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.deletePlayer = this.deletePlayer.bind(this);
      }
     
      componentDidMount() {
        var citiesRef = db.collection('Playit');
collectionData(citiesRef, 'id').subscribe(todos => {
  console.log("check with data", todos)

  this.setState({
            players: todos
          });
});
 

        // var allCities = citiesRef.get()
        //   .then(snapshot => {
        //     snapshot.forEach(doc => {
        //       console.log(doc.id, '=>', doc.data());

        //       const { player_name, points,category, team_name } = doc.data();

        //       this.playersData.push({
        //         key: doc.id,
        //         player_name,
        //         team_name,
        //         category,
        //         points
        //       });

        //       this.setState({
        //         players: this.playersData
        //       });
        //     });
        //   })
        //   .catch(err => {
        //     console.log('Error getting documents', err);
        //   });
       }

       deletePlayer(key,e ){
        db.collection('Playit').doc(key.id).delete();
        console.log('delete is pressed1', key);
    }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
      updateSearch(event){
        console.log("search it is checkedd",event.target.value);

        this.setState({searchText: event.target.value.substr(0,20)});

      }
    
      handleSubmit(e) {
        
          console.log(e.target[0].value, e.target[3].value);
        alert('A name was submitted: ' + this.state.value);
        e.preventDefault();
        const newPlayer = {
          player_name: e.target[0].value,
          category: e.target[1].value,
          team_name: e.target[2].value,
          base_price: e.target[3].value,
          
        }

        // axios.post('https://us-central1-teamplayers-f3b25.cloudfunctions.net/addItem',newPlayer)
        //   .then(res => console.log(res.data) );

  //       db
  // .doc('Players')
  // .get()
  // .then(console.log("check ddocs".docs));

  db.collection('Playit').add(newPlayer);

 
      }
    
  render() {
    let filteredPlayers = this.state.players.filter(
      (player) => {
        return player.player_name.toLowerCase().indexOf(
          this.state.searchText) !== -1;
      }
    )
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="bg-secondary shadow">
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                      <h3 className="">New Player</h3>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Message
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      Player information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="lucky"
                              id="input-username"
                              placeholder="Username"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-category"
                            >
                              Category
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Batsmen"
                              id="input-category"
                              placeholder="category"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-teamName"
                            >
                              Team Name
                            </label>
                            <Input
                            className="form-control-alternative"
                              defaultValue="India"
                              id="input-teamName"
                              placeholder="TeamName"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-points"
                            >
                              Points
                            </label>
                            <Input type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
                            {/* <select className="form-control-selectBox">
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select> */}
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Jesse"
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                            />
                           
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                          <Col>
                          <FormGroup>
                                     <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    Save Player
                  </Button>
                </div>
                          </FormGroup>
                          </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Players Directory</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button>
                    </Col>
                  </Row>
                  
                </CardHeader>
                <CardBody>
                <Row>
                    <Col xs="8" className="mb-4 mt-4 text-right">
                    <Input
                              className="form-control-alternative"
                              defaultValue=""
                              id="input-search-text"
                              placeholder="search player"
                              type="text"
                              onChange={this.updateSearch.bind(this)}
                            />
                    </Col>
                  </Row>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                    <th scope="col">S.no</th>
                      <th scope="col">Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Team</th>
                      <th scope="col">value</th>
                    </tr>
                  </thead>
                  <tbody>
                      {filteredPlayers.map((player,index) => 
                        <tr key={index}>
                        <td>{index+ 1}</td>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/bootstrap.jpg")}
                          />
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                          {player.player_name}
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>{player.category}</td>
                    <td>{player.team_name}</td>
                    <td>{player.base_price}</td>

                    <td onClick={this.deletePlayer.bind(this, player)}><i className="ni ni-fat-remove"></i></td>
                    </tr>
                        )}

                    <tr></tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default addPlayer;
