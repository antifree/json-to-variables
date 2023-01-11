# JSON to variables
This action reads json file and writes its content as environment variables.

## Inputs

### `filename`

**Required** The JSON file.

### `prefix`

The prefix. Default value `json`.

## Usage

### File content 
```json
{
    "value": "value",
    "array": [
        {
            "value": "value 0"
        },
        "value 1"
    ],
    "obj": {
        "value1": "value1",
        "value2": "value2"
    }
}
```

### YML example 
```yml
- name: JSON to variables
  uses: mncorreia/json-to-variables-fork@v1.0.1
  with:
    filename: 'test.json'
    prefix: ''
- name: Show output
  run: echo "The time was ${{ env.test_value }}, ${{ env.test_array_0_value }}, ${{ env.test_obj_value1 }}"
```
