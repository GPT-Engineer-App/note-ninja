import { useState } from 'react';
import { Container, SimpleGrid, Box, Input, Textarea, IconButton, useToast } from '@chakra-ui/react';
import { FaTrash, FaSave, FaPlus } from 'react-icons/fa';

const Note = ({ note, onSave, onDelete }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        mb={2}
      />
      <Textarea
        placeholder="Take a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        mb={2}
      />
      <IconButton
        icon={<FaSave />}
        onClick={() => onSave(note.id, title, content)}
        aria-label="Save note"
        mr={2}
      />
      <IconButton
        icon={<FaTrash />}
        onClick={() => onDelete(note.id)}
        aria-label="Delete note"
      />
    </Box>
  );
};

const Index = () => {
  const [notes, setNotes] = useState([]);
  const toast = useToast();

  const handleSave = (id, title, content) => {
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        return { ...note, title, content };
      }
      return note;
    });
    setNotes(updatedNotes);
    toast({
      title: "Note updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDelete = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    toast({
      title: "Note deleted",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      title: '',
      content: ''
    };
    setNotes([...notes, newNote]);
  };

  return (
    <Container maxW="container.xl" p={5}>
      <IconButton
        icon={<FaPlus />}
        onClick={handleAddNote}
        aria-label="Add note"
        isRound
        size="lg"
        colorScheme="teal"
        mb={4}
      />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {notes.map(note => (
          <Note key={note.id} note={note} onSave={handleSave} onDelete={handleDelete} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Index;