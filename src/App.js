import React from 'react';
import logo from './logo.svg';
import './App.css';
import history from './history';
import Seed from './randomGenerator';

function hashCode(str) {
  return str.split('').reduce((prevHash, currVal) =>
    (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
}

function sample(array, generator)
{
  var randomIndex = Math.floor(generator() * array.length);
  return array[randomIndex];
}

function worldState(query)
{
  var seedInteger = hashCode(query);
  var randomGenerator = Seed(seedInteger);

  return sample(["Long ago, you fought an epic battle against Randall Flagg's military forces. And, you lost. The people now live in a blissful state of ignorance, followed preprogrammed directives, with an implanted history and false consciousness to ensure their pliablity. Randall Flagg now hope to extract all the resources he can before he consign this dimension into oblivion. You have assumed a false identity, and blended yourself into this false world, hoping to liberate society from Randall Flagg, and maybe once more conquer this area on behalf of the Gunslingers.", "Long ago, you fought an epic battle agianst Randall Flag's military forces - though you have saved this dimension from Randall Flag, the people have been traumatized horribly. They could not handle the truth, you realize, so you offered them a pleasent falsehood instead - a Loctus Eater Machine designed to shield them from the horrors of this endless war. The people now live in a blissful state of ignorance, followed preprogrammed directives, with an implanted history and false consciousness to ensure their pliablity. But there are always dissenters out there, who oppose your wise decision, who seek to expose the people of this land to the horrors of reality. You, the ruler of this world, have assumed a false identity, and blended yourself into this false world, hoping to keep order and destroy the dissenters before they damage society utterly.","Long ago, you fought an epic battle against Randall Flagg's military forces. Both you and Flagg led massive robotic armies - and watched in horrors as both armies went rogue, deciding to no longer follow the orders of their commanders. These rogue armies killed the native population and then implanted in themselves 'false memories' - allowing themselves to enjoy their own delusional power fantasies. So the battle was over - both sides lost. You, however, have been left stranded in this desolate wasteland - as the usual methods of retreat have been cut off during the chaos. Thus, you assumed a false identity, and blended yourself into this false world, to avoid detection. Now, though, you detect signs that Randall Flagg is planning to return back to this world, with a new army - to once more try to conquer this dimension. You must stop this new military invasion, while also taking advantage of Randall Flagg's new escape portal to flee this land, and retreat back into civilization."], randomGenerator);
}

class SearchInput extends React.Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event)
  {
    history.replace(`#${event.target.value}`, null);
  }

  render() {
    return (
      <form>
        <input id="site-search" type="search" placeholder={"hello world"} value={decodeURI(this.props.query)} onChange={this.handleChange} />
      </form>
    )
  }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: history.location.hash,
        };
    }

    queryWithoutHash()
    {
      return decodeURI(this.state.query.substr(1))
    }

    componentDidMount() {
      history.listen((location, action) => {
        this.setState({
          query : history.location.hash
        });
      })
    }

    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <SearchInput query={ this.queryWithoutHash() }/>
            <TextGenerator query={ this.queryWithoutHash() }/>
          </header>
        </div>
      );
  }
}

function TextGenerator(props)
{
  if ( props.query == null || props.query === "" )
  {
    return (<p>Please write the name of the game you want us to generate the story for.</p>);
  }
  else
  {
    return (<div>{addLineBreaks(Background(props.query))}</div>);
  }
}

function Background(query)
{
  return `At first, there was chaos, disorder, mayhem, the "Outer Darkness". But order spontaneously arose from the Outer Darkness, creating the first realities. Long ago, the Old Ones have mastered the art of controlling the Outer Darkness, creating even more realities. They built a technologically advanced society in their homeland that they called "Mid-World". And, at the center of Mid-World was the Black Tower - the nexus of all universes, "real" and "fictional", allowing the Old Ones to extend their dominion over all possible realities.\n\nUpon reaching this pinnacle of success, there was nowhere else for the Old Ones to go but down...and down Mid-world went, the society collapsing into civil war and mayhem, encouraged by a man only known to us as the Crimson King. The Crimson King wanted to rebuild the multiverse in his own image - and to do that, he has to destroy the multiverse first by smashing Mid-World and the Black Tower, returning everything back to the Outer Darkness from which it sprung.\n\nThough Mid-World lie in ruins, the Black Tower survived, thanks to the help of Arthur Eld (the Mid-World version of King Arthur) who defeated the Crimson King and established the first Gunslingers, to maintain order in the land and protect against the Crimson King's schemes. After King Arthur's death, Mid-World splintered into various civilized baronies, who shared control over the Black Tower. Peace reigned  - though it was a peace enforced at gunpoint by the Gunslingers.\n\nIt was here that Randall Flagg, a henchman of the Crimson King, made his move. He, through his various proxies and shape-shifting skills, seek to undermine the baronies and lead a revolution against the Gunslingers' de facto rule, knowing that all that revolution would do is to lead to the same anarchy and mayhem that destroyed the Old Ones' civilization, and would ultimately leave the Black Tower defenseless.\n\nThe year is ■■■■■, and you're a Gunslinger, originally assigned to protect the '${query}' dimension from the Crimson King. ${worldState(query)}\n\nWelcome to the '${query}' dimension.`;
}

const addLineBreaks = string =>
  string.split('\n').map((text, index) => (
    <React.Fragment key={`${text}-${index}`}>
      {text}
      <br />
    </React.Fragment>
  ));

export default App;
